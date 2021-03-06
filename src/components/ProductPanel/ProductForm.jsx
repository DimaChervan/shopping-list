import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

class ProductForm extends Component {
  state = {
    name: ""
  };

  handleNameChange = event => {
    const name = event.target.value;

    this.setState({
      name
    });
  };

  handleFormSubmit = event => {
    const { onProductSave } = this.props;
    const { name } = this.state;

    event.preventDefault();
    if (name.length === 0) {
      return false;
    }
    onProductSave(name);
    this.setState({ name: "" });

    return true;
  };

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <TextField hintText="What needs to be buy?" fullWidth value={name} onChange={this.handleNameChange} />
      </form>
    );
  }
}

ProductForm.propTypes = {
  onProductSave: PropTypes.func.isRequired
};

export default ProductForm;
