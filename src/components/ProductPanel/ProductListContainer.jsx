import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { addProduct, toggleProduct, deleteProduct, getFilteredProducts } from "../../ducks/products";

const ProductListContainer = ({ products, onProductAdd, onProductToggle, onProductDelete }) => (
  <ProductList
    products={products}
    onProductAdd={onProductAdd}
    onProductToggle={onProductToggle}
    onProductDelete={onProductDelete}
  />
);

ProductListContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductAdd: PropTypes.func.isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getFilteredProducts(state.products, state.visibilityFilter)
});

export default connect(mapStateToProps, {
  onProductAdd: addProduct,
  onProductToggle: toggleProduct,
  onProductDelete: deleteProduct
})(ProductListContainer);
