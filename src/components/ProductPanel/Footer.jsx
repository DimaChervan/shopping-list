import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductFilter from "./ProductFilter";

const divider = { marginBottom: "8px" };

const Footer = ({ progress, activeFilter, onCompleteAll, onClearAll, handleFilterChange }) => (
  <React.Fragment>
    <ProductFilter activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
    <LinearProgress mode="determinate" value={progress} style={divider} />
    <RaisedButton label="Complete All" fullWidth primary style={divider} onClick={onCompleteAll} />
    <RaisedButton label="Clear completed" fullWidth secondary onClick={onClearAll} />
  </React.Fragment>
);

Footer.propTypes = {
  progress: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onCompleteAll: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default Footer;
