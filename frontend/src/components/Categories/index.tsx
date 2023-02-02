import React from "react";
import { categoryList, colorList } from "../../data";

import styles from "./Categories.module.css";

type PropsCategories = {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  colorId: string;
  setColorId: React.Dispatch<React.SetStateAction<string>>;
};

export const Categories: React.FC<PropsCategories> = (props) => {
  const onClickCategory = (id: string) => {
    props.setCategoryId((prev) => {
      if (id === "all") return "";

      return prev !== id ? id : "";
    });
  };

  const onClickClearFilter = () => {
    props.setMaxPrice(3000);
    props.setCategoryId("");
    props.setColorId("");
  };

  return (
    <div className={styles.categorysSection}>
      <h3 className={styles.categoryTitle}>Product Categories</h3>
      <section>
        <ul className={styles.categoryList}>
          {categoryList.map((category, i) => (
            <li
              key={category.id}
              onClick={() => onClickCategory(category.id)}
              className={
                props.categoryId === category.id ||
                (props.categoryId === "" && i === 0)
                  ? styles.active
                  : ""
              }
            >
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.priceFilter}>
        <strong className={styles.priceFilterTitle}>Filtered By Price</strong>
        <p>До {props.maxPrice}$</p>
        <input
          type="range"
          value={props.maxPrice}
          onChange={(e) => props.setMaxPrice(+e.target.value)}
          min="10"
          max="3000"
          step="10"
        />
      </section>
      <section className={styles.colorFilter}>
        <strong>Choose color</strong>
        <ul className={styles.colorList}>
          {colorList.map((color) => {
            return (
              <li
                style={{ backgroundColor: color.id }}
                key={color.id}
                className={`${styles.color} ${color.id} ${
                  color.id === props.colorId && styles.active
                }`}
                onClick={() => props.setColorId(color.id)}
              ></li>
            );
          })}
          <li
            className={styles.clearColor}
            onClick={() => props.setColorId("")}
          >
            ☓
          </li>
        </ul>
      </section>
      <button
        className={styles.clearFilter}
        onClick={() => onClickClearFilter()}
      >
        Clear filter
      </button>
    </div>
  );
};
