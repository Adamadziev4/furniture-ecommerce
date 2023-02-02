import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user";
import cartItems from "./slices/cartItems";
import storeItems from "./slices/storeItems";

export const store = configureStore({
  reducer: {
    cartItems: cartItems,
    storeItems: storeItems,
    user: user,
  },
  // middleware - логика, которая выполняется в момент запуска экшена до его выполнения
  // middleware: (getDefaultMiddleware) => ()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
