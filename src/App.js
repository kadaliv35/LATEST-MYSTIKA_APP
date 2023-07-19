// import { BrowserRouter, Routes, Route  } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import "./App.scss";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./shared/layout/Layout";
import Home from "./components/home/DailyLogin";
import WelcomeBackScreen from "./components/login/WelcomeBackScreen";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Switch>
        <Route path="/dailylogin" exact={true} component={Home} />
        <Route
          path="/welcomebackscreen"
          exact={true}
          component={WelcomeBackScreen}
        />
        <Route path="/landingpage" exact={true} component={Layout} />
        <Route path="/howtoplay" exact={true} component={Layout} />
        <Route path="/learningtraven" exact={true} component={Layout} />
        <Route path="/roadmaps" exact={true} component={Layout} />
        <Route path="/goals" exact={true} component={Layout} />
        <Route path="/charecter" exact={true} component={Layout} />
        <Route path="/contactus" exact={true} component={Layout} />
      </Switch>
    </Router>
  );
};

export default App;
