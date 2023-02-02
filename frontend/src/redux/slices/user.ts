import axios from "axios";
import instance from "../../axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  AuthResponse,
  ICartItem,
  IOrderBlock,
  IPersonalData,
} from "../../types";

// Todo: оптимизировать повторяющийся код в extraReducers

interface GetUserParams {
  username: String;
  password: String;
}

export interface IUser {
  isLoading: Boolean;
  isSucsess: Boolean;
  error: String | null;
  token: String | null;
  personalData: IPersonalData | null;
  cartItems: ICartItem[] | null;
  orderList: IOrderBlock[] | null;
}

const initialState: IUser = {
  isLoading: false,
  isSucsess: false,
  error: null,
  token: null,
  personalData: null,
  cartItems: null,
  orderList: null,
};

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ username, password }: GetUserParams, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<AuthResponse>(
        `/api/auth/registration`,
        {
          username: username,
          password: password,
        }
      );

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username, password }: GetUserParams, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<AuthResponse>(`/api/auth/login`, {
        username: username,
        password: password,
      });

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);

      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get<AuthResponse>("/api/auth/me");

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<String>) => {
      state.isSucsess = true;
      state.token = action.payload;
    },
    exitUser: (state) => {
      state.isLoading = false;
      state.isSucsess = false;
      state.error = null;
      state.token = null;
      state.personalData = null;
      state.cartItems = null;
    },
    setOrderList: (state, action: PayloadAction<IOrderBlock[]>) => {
      state.orderList = action.payload;
    },
    setPersonalData: (state, action: PayloadAction<IPersonalData>) => {
      state.personalData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucsess = true;
        state.error = "";

        if (action.payload) {
          const { token, personalData, cartItems, orderList } = action.payload;

          window.localStorage.setItem("token", token.toString());

          state.token = token;
          state.personalData = personalData;
          state.cartItems = cartItems;
          state.orderList = orderList;
        }
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucsess = true;
        state.error = "";

        if (action.payload) {
          const { token, personalData, cartItems, orderList } = action.payload;

          window.localStorage.setItem("token", token.toString());

          state.token = token;
          state.personalData = personalData;
          state.cartItems = cartItems;
          state.orderList = orderList;
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucsess = true;
        state.error = "";

        if (action.payload) {
          const { personalData, cartItems, orderList } = action.payload;

          state.personalData = personalData;
          state.cartItems = cartItems;
          state.orderList = orderList;
          state.token = window.localStorage.getItem("token");
        }
      })
      .addCase(getMe.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
  },
});

export const { setUser, exitUser, setOrderList, setPersonalData } =
  user.actions;

export default user.reducer;
