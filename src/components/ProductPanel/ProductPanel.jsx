import React from "react";
import PropTypes from "prop-types";
import ProductListContainer from "./ProductListContainer";
import FooterContainer from "./FooterContainer";
import "./ProductPanel.css";

const ProductPanel = ({ filter }) => (
  <div className="row center-xs g-panel">
    <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
      <div className="box">
        <ProductListContainer filter={filter} />
        <FooterContainer />
      </div>
    </div>
  </div>
);

ProductPanel.propTypes = {
  filter: PropTypes.string.isRequired
};

export default ProductPanel;
