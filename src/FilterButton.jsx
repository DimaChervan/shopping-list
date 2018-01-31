import React from "react";
import PropTypes from "prop-types";

const WithActiveStyle = Button => {
  const InnerWithActiveStyle = ({ onFilterChange, filter, activeFilter }) => {
    const className = filter === activeFilter ? "filter-button--active" : "";

    return <Button primary label={filter} onClick={() => onFilterChange(filter)} className={className} />;
  };

  InnerWithActiveStyle.propTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
    activeFilter: PropTypes.string
  };

  InnerWithActiveStyle.defaultProps = {
    onFilterChange: () => {},
    filter: "",
    activeFilter: ""
  };

  return InnerWithActiveStyle;
};

export default WithActiveStyle;
