import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "../components/login/Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(sessionStorage.getItem("jwttoken"));
  console.log("user++++++++++", user);
  return (
    <Route
      {...rest}
      render={(props) =>
        (user !== null ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to="/" />
        ) /*: <Login /> */)
      }
    />
  );
};
export default PrivateRoute;
