import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Jobs from "./screens/Jobs";
import Employs from "./screens/Employs";
import Times from "./screens/Times";
import Locations from "./screens/Locations";
import Layout from "./containers/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact={true} path="/jobs" component={Jobs} />
        <Route exact={true} path="/employs" component={Employs} />
        <Route exact={true} path="/times" component={Times} />
        <Route exact={true} path="/locations" component={Locations} />
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
