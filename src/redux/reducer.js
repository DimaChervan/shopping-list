import { combineReducers } from "redux";
import products from "../ducks/products";
import visibilityFilter from "../ducks/visibilityFilter";

const rootReducer = combineReducers({
  products,
  visibilityFilter
});

export default rootReducer;
