import { OrderItem } from "../OrderItem";

import { IOrderItem } from "../../types";

import styles from "./OrderBlock.module.css";

type OrderBlockProps = {
  date: String;
  orderList: IOrderItem[];
};

export const OrderBlock: React.FC<OrderBlockProps> = ({ orderList, date }) => {
  const total = orderList.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.count,
    0
  );

  return (
    <div className={styles.orderBlock}>
      <ul className={styles.orderItemList}>
        <h3 className={styles.orderData}>
          <span>Дата: {date}</span>
        </h3>
        {orderList.map((orderItem, i) => (
          <li key={i} className={styles.orderItem}>
            <OrderItem {...orderItem} />
          </li>
        ))}
        <h3 className={styles.totalPay}>
          <span>Total: {total}$</span>
        </h3>
      </ul>
    </div>
  );
};
