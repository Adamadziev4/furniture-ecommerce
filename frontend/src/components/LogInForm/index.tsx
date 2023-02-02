import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addUser } from "../../redux/slices/user";

import styles from "./LogInForm.module.css";

type LogInFormProps = {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ILogInFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

// Todo: сделать page с информацией о пользователе и с возможность ее редактировать

export const LogInForm: React.FC<LogInFormProps> = (props) => {
  const { error, isSucsess } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [logInErros, setLogInErrors] = React.useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ILogInFormData>({
    mode: "onChange",
  });

  React.useEffect(() => {
    if (isSucsess) {
      setLogInErrors("");
      reset();
      props.setIsModalActive(false);
      navigate("/");
    }

    if (error) setLogInErrors(error);
  }, [isSucsess, error]);

  const onClickSubmit: SubmitHandler<ILogInFormData> = (data) => {
    if (data.password === data.confirmPassword) {
      error ? setLogInErrors(error) : setLogInErrors("");
      dispatch(addUser({ username: data.username, password: data.password }));
    } else {
      setLogInErrors("Passwords don't match");
    }
  };

  return (
    <form className={styles.logInForm} onSubmit={handleSubmit(onClickSubmit)}>
      <h2 className={styles.title}>Log In</h2>
      <section className={styles.registration}>
        <div className={styles.username}>
          <input
            {...register("username", { required: true, minLength: 2 })}
            className={errors.username ? styles.error : null}
            type="text"
            placeholder="username"
          />
          <svg
            className={styles.userSvg}
            fill="#000000"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
          >
            <g>
              <path d="M17.438,21.937H6.562a2.5,2.5,0,0,1-2.5-2.5V18.61c0-3.969,3.561-7.2,7.938-7.2s7.938,3.229,7.938,7.2v.827A2.5,2.5,0,0,1,17.438,21.937ZM12,12.412c-3.826,0-6.938,2.78-6.938,6.2v.827a1.5,1.5,0,0,0,1.5,1.5H17.438a1.5,1.5,0,0,0,1.5-1.5V18.61C18.938,15.192,15.826,12.412,12,12.412Z" />
              <path d="M12,9.911a3.924,3.924,0,1,1,3.923-3.924A3.927,3.927,0,0,1,12,9.911Zm0-6.847a2.924,2.924,0,1,0,2.923,2.923A2.926,2.926,0,0,0,12,3.064Z" />
            </g>
          </svg>
        </div>
        <div className={styles.password}>
          <input
            {...register("password", { required: true, minLength: 6 })}
            className={errors.password ? styles.error : null}
            type="password"
            placeholder="password"
          />
          <svg
            className={styles.passwordSvg}
            fill="#000000"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
          >
            <path d="M16.9499909,19 C16.7183558,20.1411202 15.709479,21 14.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,11.5 C3,10.290521 3.85887984,9.28164422 5,9.05000906 L5,8 C5,5.23857625 7.23857625,3 10,3 C12.7614237,3 15,5.23857625 15,8 L15,9.05000906 C16.1411202,9.28164422 17,10.290521 17,11.5 L17,13 L18.5,13 C19.8807119,13 21,14.1192881 21,15.5 L21,16.5 C21,17.8807119 19.8807119,19 18.5,19 L16.9499909,19 L16.9499909,19 Z M15.9146471,19 L11.5,19 C10.1192881,19 9,17.8807119 9,16.5 L9,15.5 C9,14.1192881 10.1192881,13 11.5,13 L16,13 L16,11.5 C16,10.710487 15.3900375,10.0634383 14.6156506,10.0043921 C14.5785296,10.0131823 14.5398081,10.0178344 14.5,10.0178344 C14.4540106,10.0178344 14.4094714,10.0116254 14.367175,10 L5.5,10 C4.67157288,10 4,10.6715729 4,11.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L14.5,20 C15.1531094,20 15.7087289,19.5825962 15.9146471,19 L15.9146471,19 Z M6,9 L14,9 L14,8 C14,5.790861 12.209139,4 10,4 C7.790861,4 6,5.790861 6,8 L6,9 Z M20,16.5 L20,15.5 C20,14.6715729 19.3284271,14 18.5,14 L11.5,14 C10.6715729,14 10,14.6715729 10,15.5 L10,16.5 C10,17.3284271 10.6715729,18 11.5,18 L18.5,18 C19.3284271,18 20,17.3284271 20,16.5 Z M11.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 L13,16.5 C13,16.7761424 12.7761424,17 12.5,17 L11.5,17 C11.2238576,17 11,16.7761424 11,16.5 L11,15.5 C11,15.2238576 11.2238576,15 11.5,15 Z M14.5,15 L15.5,15 C15.7761424,15 16,15.2238576 16,15.5 L16,16.5 C16,16.7761424 15.7761424,17 15.5,17 L14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,15.5 C14,15.2238576 14.2238576,15 14.5,15 Z M17.5,15 L18.5,15 C18.7761424,15 19,15.2238576 19,15.5 L19,16.5 C19,16.7761424 18.7761424,17 18.5,17 L17.5,17 C17.2238576,17 17,16.7761424 17,16.5 L17,15.5 C17,15.2238576 17.2238576,15 17.5,15 Z"></path>{" "}
          </svg>
        </div>
        <div className={styles.password}>
          <input
            {...register("confirmPassword", { required: true, minLength: 6 })}
            className={errors.confirmPassword ? styles.error : null}
            type="password"
            placeholder="confirm password"
          />
          <svg
            className={styles.passwordSvg}
            fill="#000000"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
          >
            <path d="M16.9499909,19 C16.7183558,20.1411202 15.709479,21 14.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,11.5 C3,10.290521 3.85887984,9.28164422 5,9.05000906 L5,8 C5,5.23857625 7.23857625,3 10,3 C12.7614237,3 15,5.23857625 15,8 L15,9.05000906 C16.1411202,9.28164422 17,10.290521 17,11.5 L17,13 L18.5,13 C19.8807119,13 21,14.1192881 21,15.5 L21,16.5 C21,17.8807119 19.8807119,19 18.5,19 L16.9499909,19 L16.9499909,19 Z M15.9146471,19 L11.5,19 C10.1192881,19 9,17.8807119 9,16.5 L9,15.5 C9,14.1192881 10.1192881,13 11.5,13 L16,13 L16,11.5 C16,10.710487 15.3900375,10.0634383 14.6156506,10.0043921 C14.5785296,10.0131823 14.5398081,10.0178344 14.5,10.0178344 C14.4540106,10.0178344 14.4094714,10.0116254 14.367175,10 L5.5,10 C4.67157288,10 4,10.6715729 4,11.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L14.5,20 C15.1531094,20 15.7087289,19.5825962 15.9146471,19 L15.9146471,19 Z M6,9 L14,9 L14,8 C14,5.790861 12.209139,4 10,4 C7.790861,4 6,5.790861 6,8 L6,9 Z M20,16.5 L20,15.5 C20,14.6715729 19.3284271,14 18.5,14 L11.5,14 C10.6715729,14 10,14.6715729 10,15.5 L10,16.5 C10,17.3284271 10.6715729,18 11.5,18 L18.5,18 C19.3284271,18 20,17.3284271 20,16.5 Z M11.5,15 L12.5,15 C12.7761424,15 13,15.2238576 13,15.5 L13,16.5 C13,16.7761424 12.7761424,17 12.5,17 L11.5,17 C11.2238576,17 11,16.7761424 11,16.5 L11,15.5 C11,15.2238576 11.2238576,15 11.5,15 Z M14.5,15 L15.5,15 C15.7761424,15 16,15.2238576 16,15.5 L16,16.5 C16,16.7761424 15.7761424,17 15.5,17 L14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,15.5 C14,15.2238576 14.2238576,15 14.5,15 Z M17.5,15 L18.5,15 C18.7761424,15 19,15.2238576 19,15.5 L19,16.5 C19,16.7761424 18.7761424,17 18.5,17 L17.5,17 C17.2238576,17 17,16.7761424 17,16.5 L17,15.5 C17,15.2238576 17.2238576,15 17.5,15 Z"></path>{" "}
          </svg>
        </div>
      </section>
      <small className={styles.regError}>{logInErros && logInErros}</small>
      <div className={styles.signIn}>
        Registered?{" "}
        <em onClick={() => props.setIsLogIn(false)}>
          <u className={styles.signInText}>Sign In</u>
        </em>
      </div>
      <button className={styles.loginBtn}>Log In</button>
    </form>
  );
};
