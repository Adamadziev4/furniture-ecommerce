import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components/Form";
import { RootState } from "../../redux/store";

import styles from "./Order.module.css";

export const Order: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartItems);

  return (
    <div className={styles.orderPage}>
      <div className={styles.container}>
        {cartItems.length > 0 ? (
          <>
            <div className={styles.title}>
              <h3>Fill the form!</h3>
              <p>
                Our manager will contact you shortly to clarify the details of
                the order
              </p>
            </div>
            <Form />
          </>
        ) : (
          <div className={styles.empty}>
            <h2>First add items to cart!</h2>
            <Link to="/">To catalog</Link>
          </div>
        )}
      </div>
    </div>
  );
};
