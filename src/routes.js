import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import MyForms from "./pages/myforms";
import history from "./pages/history";
import MyProducts from "./pages/myproducts";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products" component={MyProducts} />
        <Route path="/login" component={Login} />
        <Route path="/" component={MyForms} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
