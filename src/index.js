import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import ErrorDisplaypop from './components/ErrorDisplay/ErrorDisplaypop';
const root = ReactDOM.createRoot(document.getElementById('root'));



// axios.interceptors.request.use(
//   (req) => {
//     req.headers = {
//       "Content-Type": "application/json",
//     };
//     const token = JSON.parse(sessionStorage.getItem("token"));
//     if (token !== null) {
//       req.headers.Authorization = "Bearer" + " " + token;
//        return req;
//     }else{
//       console.log('=============')
//       req.headers = {
//         "Content-Type": "application/json",
//       };
//       return req;
//     }
//   },
//   (err) => {
//     // return Promise.reject(err);
//   })
axios.interceptors.request.use(
  (req) => {
    document.body.classList.add("loading-indicator");
    req.headers = {
      "Content-Type": "application/json",
    };
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log('++++++++++++token+++++++++', token);
    if (token !== null) {
      req.headers.Authorization = "Bearer" + " " + token;
    }
    console.log("Request to server:::::::::::::::::::");
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For response
axios.interceptors.response.use(
  (res) => {
    if (
      res 
    ) {
      document.body.classList.remove("loading-indicator");
      return res;
    } else {
      document.body.classList.remove("loading-indicator");
      
    }
  },
  (err) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(err);
  }
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

