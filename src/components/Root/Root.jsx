import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "../../redux";
import "../../index.css";
import App from "../App";

const Root = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default () => {
  render(<Root />, document.getElementById("root"));
};
