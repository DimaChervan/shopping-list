import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import ProductList from "./ProductList";
import ProductFilter from "./ProductFilter";
import { processAllProducts } from "../../ducks/products";
import "./ProductPanel.css";

const divider = { marginBottom: "8px" };

class ProductPanel extends Component {
  getProgress = () => {
    const { products } = this.props;

    if (products.length === 0) {
      return 0;
    }

    return products.reduce((accum, { completed }) => accum + (completed ? 1 : 0), 0) / products.length * 100;
  };

  render() {
    const { visibilityFilter, handleCompleteAll, handleClearAll } = this.props;
    const progress = this.getProgress();

    return (
      <div className="row center-xs g-panel">
        <div className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
          <div className="box">
            <ProductList
              visibilityFilter={visibilityFilter}
              onProductToggle={this.handleProductToggle}
              onProductDelete={this.handleProductDelete}
            />
            <ProductFilter />
            <LinearProgress mode="determinate" value={progress} style={divider} />
            <RaisedButton label="Complete All" fullWidth primary style={divider} onClick={handleCompleteAll} />
            <RaisedButton label="Clear completed" fullWidth secondary onClick={handleClearAll} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, visibilityFilter }) => ({
  products,
  visibilityFilter
});

const mapDispatchToProps = dispatch => ({
  handleCompleteAll: () => dispatch(processAllProducts(true)),
  handleClearAll: () => dispatch(processAllProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPanel);
