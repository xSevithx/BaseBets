import React, { Suspense } from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
//import { BrowserRouter as Router } from "react-router-dom";

import Loader from "./layouts/loader/Loader";
import { Web3Provider } from './contexts/Web3Context'; // Adjust the import path as necessary
import { BetsProvider } from './contexts/BetsContext'; // Adjust the import path as necessary

import "./assets/css/CardStyle.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3Provider>
    <BetsProvider>
      <Suspense fallback={<Loader />}>
        <HashRouter>
          <App />
        </HashRouter>
      </Suspense>
    </BetsProvider>
  </Web3Provider>
);
reportWebVitals();
