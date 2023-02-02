import React from "react";
import axios from "../../axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setOrderList, setPersonalData } from "../../redux/slices/user";
import { setItems } from "../../redux/slices/cartItems";

import {
  ICartItem,
  IOrderBlock,
  IPersonalData,
  IPersonalFormData,
} from "../../types";

import styles from "./Form.module.css";

type UpdateDataResponse = {
  personalData: IPersonalData;
  cartItems: ICartItem[];
  orderList: IOrderBlock[];
};

export const Form: React.FC = () => {
  const { cartItems, user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isCashPay, setIsCashPay] = React.useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPersonalFormData>({
    mode: "onChange",
  });

  React.useEffect(() => {
    if (user.isSucsess) {
      user.personalData?.cashPay ? setIsCashPay(true) : setIsCashPay(false);
    }
  }, []);

  const onClickCashPay = () => {
    setIsCashPay(true);
  };

  const onClickOnlinePay = () => {
    setIsCashPay(false);
  };

  const onClickSubmit: SubmitHandler<IPersonalFormData> = async (data) => {
    if (user.isSucsess) {
      try {
        const updateData = await axios.post<UpdateDataResponse>(
          "/api/auth/user/update",
          {
            data: {
              personalData: {
                ...data,
                cashPay: isCashPay,
                onlinePay: !isCashPay,
              },
              orderList: cartItems.cartItems,
            },
          },
          {
            headers: {
              Authorization: `${user.token}`,
            },
          }
        );

        dispatch(setOrderList(updateData.data.orderList));
        dispatch(setOrderList(updateData.data.orderList));
        dispatch(setPersonalData(updateData.data.personalData));
        dispatch(setItems(updateData.data.cartItems)); // Очищаем cartItems

        navigate("/");
      } catch (error) {
        console.log("Error when sending data: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <section className={styles.namePhone}>
        <div>
          <p>
            Name<strong className={errors.name ? styles.error : null}>*</strong>
          </p>
          <input
            {...register("name", {
              required: true,
              value: user.isSucsess ? user.personalData?.name : "",
            })}
            className={errors.name ? styles.error : ""}
          />
        </div>
        <div>
          <p>
            Phone
            <strong className={errors.phone ? styles.error : null}>*</strong>
            <span className={styles.error}>
              {errors.phone?.type === "pattern" &&
                "Некорректный номер телефона"}
            </span>
          </p>
          <input
            {...register("phone", {
              required: true,
              value: user.isSucsess ? user.personalData?.phone : "",
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            })}
            className={errors.phone?.type === "required" ? styles.error : null}
          />
          {/* <div className={styles.error}>
            {errors.phone?.type === "pattern" && "Некорректный номер телефона"}
          </div> */}
        </div>
      </section>
      <section className={styles.delivery}>
        <h4 className={styles.deliveryText}>Delivery</h4>
        <div className={styles.city}>
          <p>
            City<strong className={errors.city ? styles.error : null}>*</strong>
          </p>
          <input
            {...register("city", {
              required: true,
              value: user.isSucsess ? user.personalData?.city : "",
            })}
            className={errors.city ? styles.error : null}
          />
        </div>
        <div className={styles.street}>
          <p>
            Street
            <strong className={errors.street ? styles.error : null}>*</strong>
          </p>
          <input
            {...register("street", {
              required: true,
              value: user.isSucsess ? user.personalData?.street : "",
            })}
            className={errors.street ? styles.error : null}
          />
        </div>
        <div className={styles.houseFlat}>
          <div className={styles.house}>
            <p>
              House
              <strong className={errors.house ? styles.error : null}>*</strong>
            </p>
            <input
              {...register("house", {
                required: true,
                value: user.isSucsess ? user.personalData?.house : "",
                pattern: /[0-9]/,
              })}
              className={errors.house ? styles.error : null}
            />
          </div>
          <div className={styles.flat}>
            <p>Flat</p>
            <input
              {...register("flat", {
                value: user.isSucsess ? user.personalData?.flat : "",
                pattern: /[0-9]/,
              })}
              className={errors.flat ? styles.error : null}
            />
          </div>
        </div>
      </section>
      <section className={styles.comment}>
        Comment: <br />
        <textarea
          {...register("comment", {
            value: user.isSucsess ? user.personalData?.comment : "",
          })}
        />
      </section>
      <section className={styles.pay}>
        <h4 className={styles.payTitle}>Pay method</h4>
        <div className={styles.cash}>
          <label htmlFor="cash" onClick={onClickCashPay}>
            <input
              {...register("cashPay", {})}
              checked={isCashPay}
              type="radio"
              id="cash"
              name="pay"
            />
            Cash
          </label>
        </div>
        <div className={styles.online}>
          <label htmlFor="online" onClick={onClickOnlinePay}>
            <input
              {...register("onlinePay", {})}
              checked={!isCashPay}
              type="radio"
              id="online"
              name="pay"
            />
            Online
          </label>
        </div>
      </section>
      <section className={styles.total}>
        <p>Total payable: {cartItems.totalPrice}$</p>
        <button>Pay</button>
      </section>
    </form>
  );
};
