import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import "./FilterBar.css";

const onFilterButtonClick = (fn, filter) => () => fn(filter);

const FilterBar = ({ onFilterChange }) => (
  <div className="row center-xs filter-bar">
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="All" primary onClick={onFilterButtonClick(onFilterChange, "")} />
      </div>
    </div>
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="Active" primary onClick={onFilterButtonClick(onFilterChange, "Active")} />
      </div>
    </div>
    <div className="col-xs-4">
      <div className="box">
        <RaisedButton label="Completed" primary onClick={onFilterButtonClick(onFilterChange, "Completed")} />
      </div>
    </div>
  </div>
);

FilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default FilterBar;
