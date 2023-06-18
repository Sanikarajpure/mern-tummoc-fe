import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.User.loginInfo?.user);
  return (
    <div className="text-light-call-sec dark:text-light-accent">
      Hello {user.firstName}
    </div>
  );
};

export default Home;
