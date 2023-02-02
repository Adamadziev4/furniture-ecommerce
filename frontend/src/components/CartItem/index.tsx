import React from "react";
import { useDispatch } from "react-redux";
import {
  decItemById,
  deleteItemById,
  incItemById,
} from "../../redux/slices/cartItems";
import { AppDispatch } from "../../redux/store";

import { ICartItem } from "../../types";

import styles from "./CartItem.module.css";

export const CartItem: React.FC<ICartItem> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const incCartItem = () => {
    dispatch(incItemById(props.id));
  };

  const decCartItem = () => {
    dispatch(decItemById(props.id));
  };

  return (
    <li className={styles.cartItem}>
      <div className={styles.leftSide}>
        <img src={props.imgUrl} width="80px" height="80px" alt="cart-img" />
        <div className={styles.nameCount}>
          <span className={styles.cartItemName}>{props.name}</span>
          <div className={styles.countBtnGroup}>
            <button
              className={props.count === 1 ? styles.disabled : null}
              onClick={() => decCartItem()}
            >
              -
            </button>
            <span className={styles.cartItemCount}>{props.count}</span>
            <button onClick={() => incCartItem()}>+</button>
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <span className={styles.cartItemPrice}>
          {props.price * props.count}$
        </span>
        <div
          className={styles.deleteItem}
          onClick={() => dispatch(deleteItemById(props.id))}
        >
          <button className={styles.deleteItemBtn}>☓</button>
        </div>
      </div>
    </li>
  );
};
