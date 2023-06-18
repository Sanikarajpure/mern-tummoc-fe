import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser, LoginGoogle } from "../loginAction";
import { login_user } from "../../../Actions/userActions";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/loginValidations";
import { Oval } from "react-loader-spinner";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      if (data) {
        setLoader(true);
        let response = await LoginUser(data);
        if (response) {
          dispatch(login_user(response));
          setLoader(false);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setLoader(false);
      if (err.response) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError(err.message);
      }
    }
  };

  const handleGoogleLogin = async (userData) => {
    let link = await LoginGoogle();
    console.log(link);
    window.location.assign(link);
  };

  return (
    <React.Fragment>
      <div className="loginFormWrapper relative py-2 z-20">
        <div className="loginFormBlock w-full lg:max-w-lg md:max-w-lg max-w-xs">
          <form
            className="loginForm  px-10 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="LoginTitle text-center  font-extrabold pb-6">
              <span className="text-light-call-sec dark:text-light-accent"></span>{" "}
              <span className="text-dark-accent dark:text-light-call-sec">
                Login
              </span>
            </div>
            <div className="mb-6">
              <label
                className="block dark-accent dark:text-light-accent text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                className=" 
                  rounded border-light-accent focus:border-light-call-sec  dark:border-dark-accent dark:bg-dark-bg dark:focus:border-white w-full py-2 px-3 text-light-text-small text-sm font-semibold focus:outline-none"
                id="email"
                type="text"
                placeholder="Email"
                {...register("email")}
              />
              {
                <div
                  className="invalid-feedback  text-output-error text-xs px-2 pt-1"
                  style={errors.email ? { display: "block" } : {}}
                >
                  {errors.email?.message}
                </div>
              }
            </div>

            <div className="mb-10">
              <label
                className="block dark-accent dark:text-light-accent text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none transition-border-color duration-200  border 
                  rounded border-light-accent focus:border-light-call-sec  dark:border-dark-accent dark:bg-dark-bg dark:focus:border-white w-full py-2 px-3 text-light-text-small text-sm font-semibold focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
              />{" "}
              {
                <div
                  className="invalid-feedback  text-output-error text-xs px-2 pt-1"
                  style={errors.password ? { display: "block" } : {}}
                >
                  {errors.password?.message}
                </div>
              }
            </div>
            <div
              className="invalid-feedback text-center text-output-error text-xs px-2 py-2 pt-1 "
              style={loginError ? { display: "block" } : {}}
            >
              {loginError ? loginError : null}
            </div>

            {loader ? (
              <div className=" flex justify-center w-full p-2">
                <Oval color="#5063F0" height={30} width={30} />
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="loginBtn  tracking-wide transition-background-color ease-in duration-200 p-2 pr-16 pl-16 bg-light-call-sec rounded text-center text-lg font-semibold text-light-accent cursor-pointer hover:bg-light-hover hover:text-light-call-sec dark:hover:bg-dark-accent"
                >
                  Login
                </button>
              </div>
            )}
          </form>

          <div
            className="text-light-call-sec text-center mt-4 text-xs lg:text-sm md:text-sm cursor-pointer"
            onClick={() => {
              handleGoogleLogin();
            }}
          >
            Login With Google
          </div>
          <div className="redirectToRegister dark-accent dark:text-light-accent text-center mt-4 text-xs lg:text-sm md:text-sm">
            Don't have a account?
            <span
              className="goToRegisterLink text-light-call-sec "
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              Register
            </span>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4 dark-accent dark:text-light-accent">
            &copy;2021 Cloud Call Corp. All rights reserved.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
