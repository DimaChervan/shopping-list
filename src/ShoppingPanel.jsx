import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";
import "./ShoppingPanel.css";

const divider = { marginBottom: "8px" };

export default props => (
  <div className="row center-xs shopping-panel">
    <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
      <div className="box">
        <ProductList {...props} />
        <FilterBar />
        <LinearProgress mode="determinate" value={50} style={divider} />
        <RaisedButton label="Complete All" fullWidth primary style={divider} />
        <RaisedButton label="Clear completed" fullWidth secondary />
      </div>
    </div>
  </div>
);
