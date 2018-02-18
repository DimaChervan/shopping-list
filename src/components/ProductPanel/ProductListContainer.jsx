import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { fetchAllProducts, addProduct, toggleProduct, deleteProduct, getFilteredProducts } from "../../ducks/products";

class ProductListContainer extends Component {
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { products, onProductAdd, onProductToggle, onProductDelete } = this.props;
    return (
      <ProductList
        products={products}
        onProductAdd={onProductAdd}
        onProductToggle={onProductToggle}
        onProductDelete={onProductDelete}
      />
    );
  }
}

ProductListContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllProducts: PropTypes.func.isRequired,
  onProductAdd: PropTypes.func.isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getFilteredProducts(state.products, state.visibilityFilter)
});

export default connect(mapStateToProps, {
  fetchAllProducts,
  onProductAdd: addProduct,
  onProductToggle: toggleProduct,
  onProductDelete: deleteProduct
})(ProductListContainer);
