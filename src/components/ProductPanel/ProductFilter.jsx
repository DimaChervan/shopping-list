import React from "react";
import ProductFilterButton from "./ProductFilterButton";
import "./ProductFilter.css";
import { VISIBILITY_FILTERS } from "../../ducks/products";

const ProductFilter = () => (
  <div className="row center-xs filter-bar">
    <ProductFilterButton filter={VISIBILITY_FILTERS.SHOW_ALL} label="ALL" />
    <ProductFilterButton filter={VISIBILITY_FILTERS.SHOW_ACTIVE} label="ACTIVE" />
    <ProductFilterButton filter={VISIBILITY_FILTERS.SHOW_COMPLETED} label="COMPLETED" />
  </div>
);

export default ProductFilter;
