import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import withActiveStyle from "./withActiveStyle";
import { VISIBILITY_FILTERS } from "../../ducks/products";
import "./ProductFilter.css";

const FILTER_BUTTONS = {
  [VISIBILITY_FILTERS.SHOW_ALL]: "ALL",
  [VISIBILITY_FILTERS.SHOW_ACTIVE]: "ACTIVE",
  [VISIBILITY_FILTERS.SHOW_COMPLETED]: "COMPLETED"
};
const ButtonWithActiveStyle = withActiveStyle(RaisedButton);

const ProductFilter = ({ handleFilterChange, activeFilter }) => {
  const buttons = Object.keys(FILTER_BUTTONS).map(filter => (
    <div className="col-xs-4" key={filter}>
      <div className="box">
        <ButtonWithActiveStyle
          filter={filter}
          activeFilter={activeFilter}
          label={FILTER_BUTTONS[filter]}
          onClick={() => handleFilterChange(filter)}
        />
      </div>
    </div>
  ));

  return <div className="row center-xs filter-bar">{buttons}</div>;
};

ProductFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default ProductFilter;
