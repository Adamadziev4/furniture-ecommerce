import styles from "./Pagination.module.css";

interface PaginationProps {
  totalItems: number;
  itemsOnPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const pages = [...Array(Math.ceil(props.totalItems / props.itemsOnPage))];

  const onClickPage = (page: number) => {
    props.setCurrentPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ul className={styles.pagesList}>
      {pages.map((_, i) => (
        <li
          key={i}
          className={`${i + 1 === props.currentPage ? styles.active : ""}`}
          onClick={() => onClickPage(i)}
        >
          {i + 1}
        </li>
      ))}
    </ul>
  );
};
