import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";
import { getFilteredProducts } from "../../ducks/products";

const getProductItems = products => products.map(product => <ProductItem {...product} key={product.id} />);

const ProductList = ({ products }) => {
  const productItems = getProductItems(products);

  return (
    <List>
      <Subheader>
        <ProductForm />
      </Subheader>
      {productItems}
    </List>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  products: getFilteredProducts(state.products, state.visibilityFilter)
});

export default connect(mapStateToProps)(ProductList);
