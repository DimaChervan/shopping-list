import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import ProductPanel from "../ProductPanel";
import { VISIBILITY_FILTERS } from "../../ducks/products";

const redirect = () => <Redirect to="/" />;

const App = () => (
  <Switch>
    <Route exact path={`/${VISIBILITY_FILTERS.SHOW_ALL}`} component={ProductPanel} />
    <Route path={`/${VISIBILITY_FILTERS.SHOW_ACTIVE}`} component={ProductPanel} />
    <Route path={`/${VISIBILITY_FILTERS.SHOW_COMPLETED}`} component={ProductPanel} />
    <Route render={redirect} />
  </Switch>
);

export default App;
