import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";
import { guid } from "./utils";
import FILTER_NAMES from "./constants";
import "./ShoppingPanel.css";

const divider = { marginBottom: "8px" };
const FILTER_VALUES = {
  [FILTER_NAMES.Active]: false,
  [FILTER_NAMES.Completed]: true
};

class ShoppingPanel extends Component {
  state = {
    filter: FILTER_NAMES.All,
    products: [
      { id: guid(), name: "product 1", completed: true, createdDate: Date.now() },
      { id: guid(), name: "product 2", completed: false, createdDate: Date.now() }
    ]
  };

  getProgress = () => {
    const { products } = this.state;

    if (products.length === 0) {
      return 0;
    }

    return products.reduce((accum, { completed }) => accum + (completed ? 1 : 0), 0) / products.length * 100;
  };

  getFilteredProducts = () => {
    const { products } = this.state;
    const filter = FILTER_VALUES[this.state.filter];

    if (typeof filter === "undefined") {
      return products;
    }

    return products.filter(item => item.completed === filter);
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleProductToggle = id => {
    const { products } = this.state;

    const newProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          completed: !product.completed
        };
      }

      return product;
    });

    this.setState({ products: newProducts });
  };

  handleProductDelete = id => {
    const { products } = this.state;

    const newProducts = products.filter(product => product.id !== id);
    this.setState({ products: newProducts });
  };

  handleProductAdd = name => {
    const { products } = this.state;

    this.setState({ products: [...products, { id: guid(), name, completed: false, createdDate: Date.now() }] });
  };

  handleCompleteAll = () => {
    this.handleAll(true);
  };

  handleClearAll = () => {
    this.handleAll();
  };

  handleAll = (status = false) => {
    const { products } = this.state;

    const newProducts = products.map(product => ({ ...product, completed: status }));

    this.setState({ products: newProducts });
  };

  render() {
    const { products, filter } = this.state;
    const filteredProducts = this.getFilteredProducts(products);
    const progress = this.getProgress();

    return (
      <div className="row center-xs shopping-panel">
        <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
          <div className="box">
            <ProductList
              products={filteredProducts}
              onProductToggle={this.handleProductToggle}
              onProductDelete={this.handleProductDelete}
              onProductAdd={this.handleProductAdd}
            />
            <FilterBar onFilterChange={this.handleFilterChange} activeFilter={filter} />
            <LinearProgress mode="determinate" value={progress} style={divider} />
            <RaisedButton label="Complete All" fullWidth primary style={divider} onClick={this.handleCompleteAll} />
            <RaisedButton label="Clear completed" fullWidth secondary onClick={this.handleClearAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingPanel;
