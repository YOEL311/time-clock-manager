/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./component/Login";
import Queue from "./component/Queue";
import Layout from "./component/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/queue" component={Queue} />
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
