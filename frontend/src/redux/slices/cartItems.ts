import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ICartItem } from "../../types";

export interface CartItems {
  cartItems: ICartItem[];
  totalPrice: number;
}

const initialState: CartItems = {
  cartItems: [],
  totalPrice: 0,
};

export const cartItems = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ICartItem[]>) => {
      const totalPrice = action.payload.reduce(
        (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.count,
        0
      );

      state.cartItems = action.payload;
      state.totalPrice = totalPrice;
    },
    addItem: (state, action: PayloadAction<ICartItem>) => {
      state.cartItems.push({ ...action.payload });
      state.totalPrice += action.payload.price;

      // updateCartItems();
    },
    incItemById: (state, action: PayloadAction<number>) => {
      const findItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      state.cartItems = state.cartItems.map((item) => {
        if (item.id !== action.payload) return item;

        return {
          ...item,
          count: item.count + 1,
        };
      });
      if (findItem) {
        state.totalPrice += findItem.price;
      }
    },
    decItemById: (state, action: PayloadAction<number>) => {
      const findItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (findItem && findItem.count === 1) {
        return;
      } else if (findItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id !== findItem.id) return item;

          return {
            ...item,
            count: item.count && item.count - 1,
          };
        });
      }
      if (findItem) {
        state.totalPrice -= findItem.price;
      }
    },
    deleteItemById: (state, action: PayloadAction<number>) => {
      const findItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  setItems,
  addItem,
  incItemById,
  decItemById,
  deleteItemById,
  clearItems,
} = cartItems.actions;

export default cartItems.reducer;
