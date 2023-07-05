import React from "react";
import { LoginGoogle } from "../loginAction";

import "./LoginForm.css";

const LoginForm = () => {
  const handleGoogleLogin = async () => {
    let link = await LoginGoogle();
    console.log(link);
    window.location.assign(link);
  };

  return (
    <React.Fragment>
      <div className="loginFormWrapper relative py-2 z-20 ">
        <div className="loginFormBlock w-full lg:max-w-lg md:max-w-lg max-w-xs ">
          {" "}
          <div className="LoginTitle text-center   pb-2">
            <div className=" text-dark-accent dark:text-light-call-sec font-extrabold">
              Krayo.io Files
            </div>{" "}
            <div className="text-light-call-sec dark:text-light-accent">
              Sign Up
            </div>
          </div>
          <div className="loginGoogleBlock flex justify-center items-center ">
            <button
              className="loginBtn  tracking-wide transition-background-color ease-in duration-200 p-2 pr-20 pl-20 bg-whatsApp-green rounded text-center text-lg font-semibold text-light-bg cursor-pointer hover:bg-light-hover hover:text-whatsApp-green dark:hover:bg-dark-accent"
              onClick={() => {
                handleGoogleLogin();
              }}
            >
              Using Google
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
