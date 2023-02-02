import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/slices/user";
import { AppDispatch } from "./redux/store";
import { setItems } from "./redux/slices/cartItems";

import { Store } from "./pages/Store";
import { Order } from "./pages/Order";
import { MyOrder } from "./pages/MyOrder";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const getUser = async () => {
    const { payload }: any = await dispatch(getMe());

    dispatch(setItems(payload.cartItems));
  };

  React.useEffect(() => {
    if (window.localStorage.getItem("token")) getUser();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/order" element={<Order />} />
        <Route path="/my-order" element={<MyOrder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
