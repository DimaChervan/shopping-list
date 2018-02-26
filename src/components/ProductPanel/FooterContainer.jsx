import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { processAllProducts, getProgress } from "../../ducks/products";
import Footer from "./Footer";

const FooterContainer = ({ progress, onCompleteAll, onClearAll }) => (
  <Footer progress={progress} onCompleteAll={onCompleteAll} onClearAll={onClearAll} />
);

FooterContainer.propTypes = {
  progress: PropTypes.number.isRequired,
  onCompleteAll: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
};

const mapStateToProps = ({ products }) => ({
  progress: getProgress(products)
});

const mapDispatchToProps = dispatch => ({
  onCompleteAll: () => dispatch(processAllProducts(true)),
  onClearAll: () => dispatch(processAllProducts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterContainer));
