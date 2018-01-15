import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

import ShoppingPanel from "./ShoppingPanel";

const App = () => (
  <MuiThemeProvider>
    <ShoppingPanel />
  </MuiThemeProvider>
);

export default App;
