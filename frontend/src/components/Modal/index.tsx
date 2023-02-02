import React from "react";

import styles from "./Modal.module.css";

type ModalProps = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div
      className={`${styles.modal} ${
        props.isModalActive ? styles.active : null
      }`}
      onClick={() => props.setIsModalActive(false)}
    >
      <div
        className={`${styles.modelContent} ${
          props.isModalActive ? styles.active : null
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};
