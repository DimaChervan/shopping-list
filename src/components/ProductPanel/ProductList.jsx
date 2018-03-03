import React from "react";
import PropTypes from "prop-types";
import { List } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";

const ProductList = ({ products, onProductSave, onProductToggle, onProductDelete }) => {
  const productItems = products.map(product => (
    <ProductItem {...product} key={product.id} onProductToggle={onProductToggle} onProductDelete={onProductDelete} />
  ));

  return (
    <List>
      <Subheader>
        <ProductForm onProductSave={onProductSave} />
      </Subheader>
      {productItems}
    </List>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductSave: PropTypes.func.isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

export default ProductList;
