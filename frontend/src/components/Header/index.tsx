import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { Cart } from "../Cart";
import { Modal } from "../Modal";
import { LogInForm } from "../LogInForm";
import { SignInForm } from "../SignInForm";
import { Confirm } from "../Confirm";

import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { cartItems, user } = useSelector((state: RootState) => state);

  const [isCartActive, setIsCartActive] = React.useState<boolean>(false);
  const [isAuthModal, setIsAuthModal] = React.useState<boolean>(false);
  const [isConfirmModal, setIsConfirmModal] = React.useState<boolean>(false);
  const [isLogIn, setIsLogIn] = React.useState<boolean>(true);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <main>
            <Modal
              isModalActive={isAuthModal}
              setIsModalActive={setIsAuthModal}
            >
              {isLogIn ? (
                <LogInForm
                  setIsLogIn={setIsLogIn}
                  setIsModalActive={setIsAuthModal}
                />
              ) : (
                <SignInForm
                  setIsLogIn={setIsLogIn}
                  setIsModalActive={setIsAuthModal}
                />
              )}
            </Modal>
            <nav className={styles.navbar}>
              <ul className={styles.navList}>
                <li>
                  <Link to="/">Store</Link>
                </li>
                <li>
                  <Link to="/order">Order</Link>
                </li>
              </ul>
              <div className={styles.rightSide}>
                {user.isSucsess ? (
                  <>
                    <Modal
                      isModalActive={isConfirmModal}
                      setIsModalActive={setIsConfirmModal}
                    >
                      <Confirm setIsModalActive={setIsConfirmModal}>
                        <h3>Вы уверены что хотите выйти?</h3>
                      </Confirm>
                    </Modal>
                    <span onClick={() => setIsConfirmModal((prev) => !prev)}>
                      Log out
                    </span>
                    <span className={styles.myOrder}>
                      <Link to="/my-order">My orders</Link>
                    </span>
                  </>
                ) : (
                  <span
                    className={styles.signIn}
                    onClick={() => setIsAuthModal((prev) => !prev)}
                  >
                    Sign In
                  </span>
                )}
                <button
                  className={styles.cartSvg}
                  onClick={() => setIsCartActive(!isCartActive)}
                >
                  <svg width="36" height="36" viewBox="0 0 446.853 446.853">
                    <path
                      fill="rgb(122, 68, 68)"
                      // fill="rgb(45, 155, 0)"
                      // fill="rgba(0, 0, 255, 0.8)"
                      d="M444.274,93.36c-2.558-3.666-6.674-5.932-11.145-6.123L155.942,75.289c-7.953-0.348-14.599,5.792-14.939,13.708
		c-0.338,7.913,5.792,14.599,13.707,14.939l258.421,11.14L362.32,273.61H136.205L95.354,51.179
		c-0.898-4.875-4.245-8.942-8.861-10.753L19.586,14.141c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591
		l59.491,23.371l41.572,226.335c1.253,6.804,7.183,11.746,14.104,11.746h6.896l-15.747,43.74c-1.318,3.664-0.775,7.733,1.468,10.916
		c2.24,3.184,5.883,5.078,9.772,5.078h11.045c-6.844,7.617-11.045,17.646-11.045,28.675c0,23.718,19.299,43.012,43.012,43.012
		s43.012-19.294,43.012-43.012c0-11.028-4.201-21.058-11.044-28.675h93.777c-6.847,7.617-11.047,17.646-11.047,28.675
		c0,23.718,19.294,43.012,43.012,43.012c23.719,0,43.012-19.294,43.012-43.012c0-11.028-4.2-21.058-11.042-28.675h13.432
		c6.6,0,11.948-5.349,11.948-11.947c0-6.6-5.349-11.948-11.948-11.948H143.651l12.902-35.843h216.221
		c6.235,0,11.752-4.028,13.651-9.96l59.739-186.387C447.536,101.679,446.832,97.028,444.274,93.36z M169.664,409.814
		c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117s19.116,8.574,19.116,19.117S180.207,409.814,169.664,409.814z
		 M327.373,409.814c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117
		S337.916,409.814,327.373,409.814z"
                    />
                  </svg>
                  {cartItems.cartItems.length > 0 && (
                    <div className={styles.count}>
                      {cartItems.cartItems.length}
                    </div>
                  )}
                </button>
              </div>
            </nav>
          </main>
        </div>
      </div>
      <Cart isCartActive={isCartActive} setIsCartActive={setIsCartActive} />
    </>
  );
};
