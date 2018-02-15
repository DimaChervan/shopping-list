import { createStore } from "redux";
import reducer from "./reducer";
import guid from "../utils";

const products = [
  { id: guid(), name: "product 1", completed: true, createdDate: Date.now() },
  { id: guid(), name: "product 2", completed: false, createdDate: Date.now() }
];
const store = createStore(reducer, { products });

export default store;
