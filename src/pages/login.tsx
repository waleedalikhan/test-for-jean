import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authenticateUser, useAppDispatch, useAppSelector } from "@/store";
import toast from "react-hot-toast";
import { history } from "@/helper";
import { LoginForm } from "@/types";
import authService from "@/services/auth.services";

type Props = {
  name?: string;
};

export const Login: FC<Props> = ({ name }) => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      history.navigate("/");
    }
  }, [isAuthenticated]);

  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const { errors, isSubmitting } = formState;

  const onSubmit = (loginForm: LoginForm): void => {
    dispatch(authenticateUser(loginForm));

    // toast.success("Successfully toasted!");
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="card border border-gray-300 dark:border-white w-[25rem] p-7 rounded-xl">
        <h2 className="card-header dark:text-white font-mons font-semibold sm:text-3xl text-2xl">
          Welcome Back
        </h2>
        <p className="pb-5 text-gray-500 dark:text-gray-200 text-sm font-mons">
          Please fill-up all the credentials
        </p>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group flex flex-col pb-5">
              <label className="dark:text-white font-mons font-medium">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true, maxLength: 100 })}
                className={`form-control border-0 focus:border-b focus:outline-none focus:ring-0 bg-transparent border-b border-gray-400 dark:border-gray-300 dark:text-white font-mons ${
                  errors.username ? "is-invalid" : ""
                } dark: text-black`}
              />
              {errors?.username && (
                <div className="text-red-500 text-[12px] font-mons">
                  Username is required
                </div>
              )}
              {/* <div className="invalid-feedback">{errors}</div> */}
            </div>
            <div className="form-group flex flex-col pb-5">
              <label className="dark:text-white font-mons font-medium">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, maxLength: 30 })}
                className={`form-control border-0 focus:border-b focus:outline-none focus:ring-0 bg-transparent border-b border-gray-400 dark:border-gray-300 dark:text-white ${
                  errors.password ? "is-invalid" : ""
                } dark: text-black`}
              />
              {/* <div className="invalid-feedback">{errors.username?.message}</div> */}
              {errors?.password && (
                <div className="text-red-500 text-[12px] font-mons">
                  Password is required
                </div>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl w-full h-12 font-mons"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            {/* {authError &&
              <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
            } */}
          </form>
        </div>
      </div>
    </div>
  );
};
