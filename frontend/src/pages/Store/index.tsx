import React from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getStoreItems } from "../../redux/slices/storeItems";

import { StoreItem } from "../../components/StoreItem";
import { Pagination } from "../../components/Pagination";
import { Categories } from "../../components/Categories";

import styles from "./Store.module.css";

export const Store: React.FC = () => {
  const { storeItems, cartItems, user } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch<AppDispatch>();

  const [maxPrice, setMaxPrice] = React.useState<number>(3000);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [colorId, setColorId] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const limitOnPage = 10;

  const updateBucket = async () => {
    try {
      await axios.post(
        "/api/auth/user/update-cart-items",
        {
          data: {
            cartItems: cartItems.cartItems,
          },
        },
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error updating the bucket: ", error);
    }
  };

  React.useEffect(() => {
    dispatch(
      getStoreItems({
        category: categoryId,
        color: colorId,
        price: maxPrice,
        limit: limitOnPage,
        page: currentPage,
        searchValue: searchValue,
      })
    );
  }, [dispatch, categoryId, colorId, maxPrice, currentPage, searchValue]);

  React.useEffect(
    () => setCurrentPage(1),
    [categoryId, colorId, maxPrice, searchValue]
  );

  React.useEffect(() => {
    if (user.isSucsess && user.token) {
      if (
        JSON.stringify(user.cartItems) !== JSON.stringify(cartItems.cartItems)
      ) {
        updateBucket();
      }
    }
  }, [cartItems.cartItems]);

  const onClickClearSearch = () => {
    setSearchValue("");
    setCurrentPage(1);
  };

  return (
    <div className={styles.storePage}>
      <h2 className={styles.storeTitle}>Store</h2>
      <div className={styles.container}>
        <Categories
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          colorId={colorId}
          setColorId={setColorId}
        />
        <section className={styles.itemsSection}>
          <div>
            <div className={styles.itemsSectionHeader}>
              <h3>Furniture:</h3>
              <div className={styles.searchContainer}>
                <span onClick={() => onClickClearSearch()}>×</span>
                <input
                  className={styles.search}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="search.."
                />
              </div>
            </div>
            {storeItems.storeItems.length > 0 ? (
              <ul className={styles.gridItems}>
                {storeItems.storeItems.map((item) => (
                  <StoreItem key={item.id} {...item} />
                ))}
              </ul>
            ) : (
              <div className={styles.emptyStoreItems}>
                <h2>There are no products on the page</h2>
              </div>
            )}
          </div>
          {storeItems.totalCount > limitOnPage && (
            <Pagination
              itemsOnPage={limitOnPage}
              totalItems={storeItems.totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
};
