import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import ProductFilter from "./ProductFilter";
import { processAllProducts, getProgress } from "../../ducks/products";
import "./ProductPanel.css";

const divider = { marginBottom: "8px" };

const ProductPanel = ({ progress, handleCompleteAll, handleClearAll }) => (
  <div className="row center-xs g-panel">
    <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
      <div className="box">
        <ProductList />
        <ProductFilter />
        <LinearProgress mode="determinate" value={progress} style={divider} />
        <RaisedButton label="Complete All" fullWidth primary style={divider} onClick={handleCompleteAll} />
        <RaisedButton label="Clear completed" fullWidth secondary onClick={handleClearAll} />
      </div>
    </div>
  </div>
);

ProductPanel.propTypes = {
  progress: PropTypes.number.isRequired,
  handleCompleteAll: PropTypes.func.isRequired,
  handleClearAll: PropTypes.func.isRequired
};

const mapStateToProps = ({ products }) => ({
  progress: getProgress(products)
});

const mapDispatchToProps = dispatch => ({
  handleCompleteAll: () => dispatch(processAllProducts(true)),
  handleClearAll: () => dispatch(processAllProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPanel);
