import React from "react";
import { useSelector } from "react-redux";
import { OrderBlock } from "../../components/OrderBlock";
import { RootState } from "../../redux/store";

import styles from "./MyOrder.module.css";

export const MyOrder: React.FC = () => {
  const { user } = useSelector((state: RootState) => state);

  return (
    <div className={styles.myOrderPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>My orders:</h1>
        {user.orderList?.length ? (
          <ul className={styles.orderList}>
            {user.orderList.map((orderBlock, i) => (
              <OrderBlock
                key={i}
                orderList={orderBlock.order}
                date={orderBlock.date}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.emptyOrder}>
            <h2>You didn't order anything(</h2>
          </div>
        )}
      </div>
    </div>
  );
};
