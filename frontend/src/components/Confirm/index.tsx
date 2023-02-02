import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearItems } from "../../redux/slices/cartItems";
import { exitUser } from "../../redux/slices/user";
import { AppDispatch } from "../../redux/store";

import styles from "./Confirm.module.css";

type ConfirmProps = {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const Confirm: React.FC<ConfirmProps> = ({
  setIsModalActive,
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onClickYes = () => {
    dispatch(exitUser());
    setIsModalActive(false);
    dispatch(clearItems());
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={styles.confirm}>
      {children}
      <div className={styles.confirmBtns}>
        <button onClick={onClickYes}>Да</button>
        <button onClick={() => setIsModalActive(false)}>Нет</button>
      </div>
    </div>
  );
};
