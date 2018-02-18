import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { processAllProducts, getProgress, setVisibilityFilter } from "../../ducks/products";
import Footer from "./Footer";

const FooterContainer = ({ progress, activeFilter, onCompleteAll, onClearAll, handleFilterChange }) => (
  <Footer
    progress={progress}
    onCompleteAll={onCompleteAll}
    onClearAll={onClearAll}
    activeFilter={activeFilter}
    handleFilterChange={handleFilterChange}
  />
);

FooterContainer.propTypes = {
  progress: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onCompleteAll: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

const mapStateToProps = ({ products, visibilityFilter }) => ({
  progress: getProgress(products),
  activeFilter: visibilityFilter
});

const mapDispatchToProps = dispatch => ({
  onCompleteAll: () => dispatch(processAllProducts(true)),
  onClearAll: () => dispatch(processAllProducts()),
  handleFilterChange: filter => dispatch(setVisibilityFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
