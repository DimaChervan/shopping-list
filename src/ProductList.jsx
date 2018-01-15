import React from "react";
import PropTypes from "prop-types";
import { List } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";

const getProductItems = (products, onProductToggle, onProductDelete) =>
  products.map(product => (
    <ProductItem {...product} key={product.id} onProductToggle={onProductToggle} onProductDelete={onProductDelete} />
  ));

const ProductList = ({ products, onProductToggle, onProductDelete, onProductAdd }) => {
  const productItems = getProductItems(products, onProductToggle, onProductDelete);

  return (
    <List>
      <Subheader><ProductForm onSubmit={onProductAdd} /></Subheader>
      {productItems}
    </List>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired,
  onProductAdd: PropTypes.func.isRequired
};

export default ProductList;
