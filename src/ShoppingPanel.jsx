import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";

export default props => (
  <div>
    <ProductList {...props} />
    <FilterBar />
    <LinearProgress mode="determinate" value={50} />
    <br />
    <RaisedButton label="Complete All" fullWidth primary />
    <br />
    <br />
    <RaisedButton label="Clear completed" fullWidth secondary />
  </div>
);
