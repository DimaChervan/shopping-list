import React, { Component } from "react";

/* eslint-disable react/prefer-stateless-function */

const withStateful = StatelessComponent => {
  class Stateful extends Component {
    render() {
      const { props } = this;
      return <StatelessComponent {...props} />;
    }
  }

  return Stateful;
};

export default withStateful;
