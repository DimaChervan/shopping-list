import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import witStateful from "./withStateful";
import "./ProductFilterButton.css";

const StatefulNavLink = witStateful(NavLink);

const ProductFilterButton = ({ filter, label }) => (
  <div className="col-xs-4">
    <div className="box">
      <RaisedButton
        label={label}
        primary
        containerElement={<StatefulNavLink exact to={`/${filter}`} activeClassName="filter-button--active" />}
      />
    </div>
  </div>
);

ProductFilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default ProductFilterButton;
