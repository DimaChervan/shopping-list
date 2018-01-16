import React from "react";

const WithActiveStyle = Button => {
  const InnerWithActiveStyle = ({ onFilterChange, filter, activeFilter }) => {
    const className = filter === activeFilter ? "filter-button--active" : "";

    return <Button primary label={filter} onClick={() => onFilterChange(filter)} className={className} />;
  };

  return InnerWithActiveStyle;
};

export default WithActiveStyle;
