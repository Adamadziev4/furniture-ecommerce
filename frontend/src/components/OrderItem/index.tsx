import styles from "./OrderItem.module.css";

import { IOrderItem } from "../../types";

export const OrderItem: React.FC<IOrderItem> = ({
  name,
  imgUrl,
  price,
  count,
}) => {
  return (
    <div className={styles.orderItem}>
      <div className={styles.imgName}>
        <img src={imgUrl} alt="order-item" width="150px" height="150px" />
        <h3 className={styles.name}>{name}</h3>
      </div>
      <h3>Count: {count}</h3>
      <h3>Price: {price * count}$</h3>
    </div>
  );
};
