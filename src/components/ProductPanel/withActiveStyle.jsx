import React from "react";
import PropTypes from "prop-types";
import "./withActiveStyle.css";

const withActiveStyle = Button => {
  const InnerWithActiveStyle = props => {
    const { filter, activeFilter, label, onClick } = props;
    const className = filter === activeFilter ? "filter-button--active" : "";
    console.log(onClick);
    return <Button primary label={label} className={className} onClick={onClick} />;
  };

  InnerWithActiveStyle.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    filter: PropTypes.string,
    activeFilter: PropTypes.string
  };

  InnerWithActiveStyle.defaultProps = {
    onClick: () => {},
    label: "",
    filter: "",
    activeFilter: ""
  };

  return InnerWithActiveStyle;
};

export default withActiveStyle;
