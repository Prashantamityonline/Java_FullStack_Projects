import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAi5IBM9ejv64ydnM3O5sWJOUOgHX0VFXc",
  authDomain: "chat-book-f51a8.firebaseapp.com",
  databaseURL: "https://chat-book-f51a8-default-rtdb.firebaseio.com",
  projectId: "chat-book-f51a8",
  storageBucket: "chat-book-f51a8.appspot.com",
  messagingSenderId: "939185731701",
  appId: "1:939185731701:web:7cc60fbc321cb247b9e03c"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig)

  ReactDOM.render(
  <React.StrictMode>
    <App /> 
   
  </React.StrictMode>,
     document.getElementById('root')
);
//If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
