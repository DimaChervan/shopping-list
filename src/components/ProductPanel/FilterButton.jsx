import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setVisibilityFilter } from "../../ducks/visibilityFilter";

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

  const mapStateToProps = ({ visibilityFilter }) => ({
    activeFilter: visibilityFilter
  });

  return connect(mapStateToProps, { onFilterChange: setVisibilityFilter })(InnerWithActiveStyle);
};

export default WithActiveStyle;
