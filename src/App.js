// import { BrowserRouter, Routes, Route  } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "./App.scss";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./shared/layout/Layout";
import Home from "./components/home/DailyLogin";
import WelcomeBackScreen from "./components/login/WelcomeBackScreen";
import { Elements } from "@stripe/react-stripe-js";
import "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessPage from './shared/layout/SuccessPage';
import { ToastContainer } from "react-toastify";

const App = () => {
  const stripePromise = loadStripe('pk_test_51Nl8GySHVh0kvU8q8BMqkbihq86Dq2k30zAUnJJ7Qb0TanEh51HxJZByWyVudbKNK16Z9iO4GRWsSTY9eWIEVxtA00rYzVnQZZ');

  return (
    <Elements stripe={stripePromise}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
        closeButton={false}
        limit={3}
      />
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
          <Route path="/successpage" exact={true} component={SuccessPage} />
          <Route path="/howtoplay" exact={true} component={Layout} />
          <Route path="/learningtraven" exact={true} component={Layout} />
          <Route path="/roadmaps" exact={true} component={Layout} />
          <Route path="/goals" exact={true} component={Layout} />
          <Route path="/charecter" exact={true} component={Layout} />
          <Route path="/contactus" exact={true} component={Layout} />
        </Switch>
      </Router>
    </Elements>
  );
};

export default App;
