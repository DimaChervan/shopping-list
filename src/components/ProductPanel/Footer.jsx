import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductFilter from "./ProductFilter";

const divider = { marginBottom: "8px" };

const Footer = ({ progress, onCompleteAll, onClearAll }) => (
  <React.Fragment>
    <ProductFilter />
    <LinearProgress mode="determinate" value={progress} style={divider} />
    <RaisedButton label="Complete All" fullWidth primary style={divider} onClick={onCompleteAll} />
    <RaisedButton label="Clear completed" fullWidth secondary onClick={onClearAll} />
  </React.Fragment>
);

Footer.propTypes = {
  progress: PropTypes.number.isRequired,
  onCompleteAll: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
};

export default Footer;
