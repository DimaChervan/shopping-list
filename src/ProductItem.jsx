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

const onItemToggle = (fn, id) => () => fn(id);
const onItemDelete = (fn, id) => () => fn(id);

const ProductItem = ({ name, completed, createdDate, id, onProductToggle, onProductDelete }) => {
  const onToggle = onItemToggle(onProductToggle, id);
  const onDelete = onItemDelete(onProductDelete, id);
  const checkBox = <Checkbox checked={completed} onCheck={onToggle} />;
  const date = getFormatedDate(createdDate);
  const deleteButton = (
    <FloatingActionButton mini secondary onClick={onDelete}>
      <ActionDelete />
    </FloatingActionButton>
  );

  return <ListItem primaryText={name} secondaryText={date} leftCheckbox={checkBox} rightIconButton={deleteButton} />;
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  createdDate: PropTypes.number.isRequired,
  onProductToggle: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

export default ProductItem;
