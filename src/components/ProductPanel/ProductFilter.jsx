import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import WithActiveStyle from "./FilterButton";
import FILTER_NAMES from "../../constants";
import "./ProductFilter.css";

const FilterButton = WithActiveStyle(RaisedButton);

const FilterBar = props => {
  const buttons = Object.keys(FILTER_NAMES).map(filter => (
    <div className="col-xs-4" key={filter}>
      <div className="box">
        <FilterButton filter={filter} {...props} />
      </div>
    </div>
  ));

  return <div className="row center-xs filter-bar">{buttons}</div>;
};

export default FilterBar;
