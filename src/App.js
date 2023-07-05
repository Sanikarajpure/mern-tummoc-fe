import React from "react";
import { Routes, Route } from "react-router-dom";
import PreventSigninRoute from "./Utilities/preventSignRoute";
import PrivateRoute from "./Utilities/PrivateRoute";
import Toggle from "./Utilities/toggle";
import Login from "./routes/Login";
import Home from "./routes/Home/components/home";
import "./App.css";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-dark-bg min-h-screen">
        <div className="  absolute right-12 top-0 p-2 ">
          <Toggle />
        </div>

        <Routes>
          <Route path="/" element={<PreventSigninRoute />}>
            <Route exact path="/" element={<Login />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
