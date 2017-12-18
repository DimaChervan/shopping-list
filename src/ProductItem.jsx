import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ActionDelete from "material-ui/svg-icons/action/delete";

const getFormatedDate = timestamp => {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-UA", { year: "numeric", month: "long", day: "2-digit" });
};

const ProductItem = ({ name, completed, createdDate }) => {
  const checkBox = <Checkbox checked={completed} />;
  const date = getFormatedDate(createdDate);
  const deleteButton = (
    <FloatingActionButton mini secondary>
      <ActionDelete />
    </FloatingActionButton>
  );

  return <ListItem primaryText={name} secondaryText={date} leftCheckbox={checkBox} rightIconButton={deleteButton} />;
};

ProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  createdDate: PropTypes.number.isRequired
};

export default ProductItem;
