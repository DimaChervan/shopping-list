import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";
import "./ShoppingPanel.css";

const divider = { marginBottom: "8px" };
const Filters = {
  Active: false,
  Completed: true
};
let lastId = 3;

class ShoppingPanel extends Component {
  state = {
    filter: "",
    products: [
      { id: 1, name: "product 1", completed: true, createdDate: Date.now() },
      { id: 2, name: "product 2", completed: false, createdDate: Date.now() }
    ]
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredProducts = () => {
    const { products } = this.state;
    const filter = Filters[this.state.filter];

    if (typeof filter === "undefined") {
      return products;
    }

    return products.filter(item => item.completed === filter);
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

    this.setState({ products: [...products, { id: lastId++, name, completed: false, createdDate: Date.now() }] });
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
    const { products } = this.state;
    const filteredProducts = this.getFilteredProducts(products);
    const progress = products.reduce((accum, { completed }) => accum + (completed ? 1 : 0), 0) / products.length * 100;
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
            <FilterBar onFilterChange={this.handleFilterChange} />
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
