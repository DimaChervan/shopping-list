import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import ProductPanel from "../ProductPanel";
import { VISIBILITY_FILTERS } from "../../ducks/products";

const redirect = () => <Redirect to="/" />;

const App = () => (
  <Switch>
    <Route
      exact
      path="/:filter?"
      render={({ match }) => {
        const { filter = "all" } = match.params;

        return Object.prototype.hasOwnProperty.call(VISIBILITY_FILTERS, filter) ? <ProductPanel /> : redirect();
      }}
    />
    <Route render={redirect} />
  </Switch>
);

export default App;
