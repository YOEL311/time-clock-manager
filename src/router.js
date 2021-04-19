/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Jobs from "./component/Jobs";
import Employs from "./component/Employs";
import Layout from "./containers/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact={true} path="/jobs" component={Jobs} />
        <Route exact={true} path="/jobs" component={Jobs} />
        <Route exact={true} path="/employs" component={Employs} />
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
