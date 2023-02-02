import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { CartItem } from "../CartItem";

import styles from "./Cart.module.css";

type PropsCart = {
  isCartActive: Boolean;
  setIsCartActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Cart: React.FC<PropsCart> = ({
  isCartActive,
  setIsCartActive,
}) => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);

  return (
    <div className={`${styles.cart} ${isCartActive && styles.active}`}>
      <button
        className={styles.closeCartBtn}
        onClick={() => setIsCartActive(false)}
      >
        ☓
      </button>
      <h3 className={styles.cartTitle}>Cart</h3>

      {cartItems.length > 0 ? (
        <ul className={styles.cartItemsList}>
          {cartItems.map((item, i) => (
            <CartItem key={i} {...item} />
          ))}
          <div className={styles.checkout}>
            <Link to="/order">
              <button
                className={styles.checkoutBtn}
                onClick={() => setIsCartActive(false)}
              >
                Checkout
              </button>
            </Link>
          </div>
        </ul>
      ) : (
        <div className={styles.cartEmpty}>
          <h4>
            <em>Cart is empty</em>
            <p onClick={() => setIsCartActive(false)}>
              <Link to="/">In store</Link>
            </p>
          </h4>
        </div>
      )}
    </div>
  );
};
