import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductList from "./ProductList";
import { fetchProducts, saveProduct, toggleProduct, deleteProduct, getFilteredProducts } from "../../ducks/products";

class ProductListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props;
    if (filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchProducts: fetchProductsData } = this.props;
    fetchProductsData(filter);
  }

  render() {
    const { products, onProductSave, onProductToggle, onProductDelete } = this.props;

    return (
      <ProductList
        products={products}
        onProductSave={onProductSave}
        onProductToggle={onProductToggle}
        onProductDelete={onProductDelete}
      />
    );
  }
}

ProductListContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  onProductSave: PropTypes.func.isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

const mapStateToProps = ({ products, visibilityFilter }) => ({
  products: getFilteredProducts(products, visibilityFilter)
});

export default connect(mapStateToProps, {
  fetchProducts,
  onProductSave: saveProduct,
  onProductToggle: toggleProduct,
  onProductDelete: deleteProduct
})(ProductListContainer);
