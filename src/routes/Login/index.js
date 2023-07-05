import React from "react";
import LoginForm from "./components/LoginForm";
import lines_2 from "../../assests/lines-2.svg";
import lines_4 from "../../assests/lines-4.svg";
import "./login.css";

const Login = () => {
  return (
    <div className="loginWrapper ">
      {" "}
      <div className="flex max-w-screen">
        <div className="md:w-1/2  absolute -left-4  top-1/4 md:top-1/4 md:-left-4 ">
          <img
            src={lines_2}
            alt=""
            className="w-3/5 mt-30 md:mt-36 rotate-180"
          />
        </div>
        <div className="md:w-1/2 absolute  top-10 -right-0 pl-60  flex justify-end ">
          <img src={lines_4} alt="" className="w-2/4 mt-3" />
        </div>
      </div>
      <LoginForm />
      <p className="text-center text-gray-500 text-xs mt-4 dark-accent dark:text-light-accent">
        &copy;2023 Krayo.io All rights reserved.
      </p>
    </div>
  );
};

export default Login;
