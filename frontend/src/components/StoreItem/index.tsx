import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decItemById,
  deleteItemById,
  incItemById,
} from "../../redux/slices/cartItems";
import { AppDispatch, RootState } from "../../redux/store";

import styles from "./StoreItem.module.css";

type PropsStoreItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: PropsStoreItem) => {
  const { cartItems } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const isCartItems = cartItems.cartItems.find((item) => item.id === id);

  const addCartItem = () => {
    dispatch(addItem({ id, name, price, imgUrl, count: 1 }));
  };

  const incCartItem = () => {
    dispatch(incItemById(id));
  };

  const decCartItem = () => {
    dispatch(decItemById(id));
  };

  return (
    <li className={styles.storeItem}>
      <img src={imgUrl} height="100px" alt="img" />
      <div className={styles.storeItemContainer}>
        <div className={styles.nameAndPrice}>
          <strong className={styles.storeItemName}>{name}</strong>
          <p className={styles.storeItemPrice}>
            <strong>$</strong>
            {price}
          </p>
        </div>
        {!isCartItems ? (
          <div className={styles.addBtn} onClick={addCartItem}>
            <button>+ Add to cart</button>
          </div>
        ) : (
          <div>
            <button
              className={`${styles.minusBtn} ${
                isCartItems.count === 1 ? styles.disabled : ""
              }`}
              onClick={decCartItem}
            >
              -
            </button>
            <span className={styles.itemsCount}>{isCartItems.count}</span>
            <button className={styles.plusBtn} onClick={incCartItem}>
              +
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => dispatch(deleteItemById(id))}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
