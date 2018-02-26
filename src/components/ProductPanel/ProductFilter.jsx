import React from "react";
import ProductFilterButton from "./ProductFilterButton";
import "./ProductFilter.css";
import { VISIBILITY_FILTERS } from "../../ducks/products";

const ProductFilter = () => (
  <div className="row center-xs filter-bar">
    <ProductFilterButton filter={VISIBILITY_FILTERS.all} label="ALL" />
    <ProductFilterButton filter={VISIBILITY_FILTERS.active} label="ACTIVE" />
    <ProductFilterButton filter={VISIBILITY_FILTERS.completed} label="COMPLETED" />
  </div>
);

export default ProductFilter;
