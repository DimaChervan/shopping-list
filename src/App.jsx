import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

import ShoppingPanel from "./ShoppingPanel";

const products = [
  { id: 1, name: "product 1", completed: true, createdDate: Date.now() },
  { id: 2, name: "product 2", completed: false, createdDate: Date.now() }
];

const App = () => (
  <MuiThemeProvider>
    <ShoppingPanel products={products} />
  </MuiThemeProvider>
);

export default App;
