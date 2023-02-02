// import axios from "axios";
import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { IStoreItem } from "../../types";

type queryParams = {
  id?: number;
  category: string;
  color?: string;
  page?: number;
  price?: number;
  limit?: number;
  searchValue?: string;
};

type StoreItemsState = {
  storeItems: IStoreItem[];
  totalCount: number;
  status: "loading" | "failed" | "success";
};

type Payload = {
  data: IStoreItem[];
  totalCount: number;
};

export const getStoreItems = createAsyncThunk(
  "storeItems/getStoreItems",
  async (
    { id, category, color, price, limit, page, searchValue }: queryParams,
    { rejectWithValue }
  ) => {
    const URL = `/api/items?id=${id}&category=${category}&color=${color}&price=${price}&limit=${limit}&page=${page}&name=${searchValue}`;

    try {
      const { data } = await axios(URL);

      return data;
    } catch (err) {
      console.log("Произошла ошибка при получении данных: ", err);
      return rejectWithValue(err);
    }
  }
);

const initialState: StoreItemsState = {
  storeItems: [],
  totalCount: 0,
  status: "loading",
};

const storeItems = createSlice({
  name: "storeItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getStoreItems.fulfilled,
      (state, action: PayloadAction<Payload>) => {
        state.storeItems = action.payload.data.map((item) => {
          const { _id, id, name, category, color, price, imgUrl } = item;
          return {
            _id,
            id,
            name,
            category,
            color,
            price,
            imgUrl,
          };
        });
        state.totalCount = action.payload.totalCount;
        state.status = "success";
      }
    );
    builder.addCase(getStoreItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getStoreItems.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default storeItems.reducer;
