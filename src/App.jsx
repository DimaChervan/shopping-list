import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import logo from "./logo.svg";
import "./App.css";

import ShoppingPanel from "./ShoppingPanel";

const products = [
  { id: 1, name: "product 1", completed: true, createdDate: Date.now() },
  { id: 2, name: "product 2", completed: false, createdDate: Date.now() }
];

const App = () => (
  <MuiThemeProvider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ShoppingPanel products={products} />
    </div>
  </MuiThemeProvider>
);

export default App;
