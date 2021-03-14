import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Home, Dev } from "./pages";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dev" component={Dev} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
