import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./redux";
import "./index.css";
import App from "./components/App";

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);

export default () => {
  ReactDOM.render(<Root />, document.getElementById("root"));
};
