import React from "react";
import ProductListContainer from "./ProductListContainer";
import FooterContainer from "./FooterContainer";
import "./ProductPanel.css";

const ProductPanel = () => (
  <div className="row center-xs g-panel">
    <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
      <div className="box">
        <ProductListContainer />
        <FooterContainer />
      </div>
    </div>
  </div>
);

export default ProductPanel;
