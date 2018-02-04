import appName from "../config";
import guid from "../utils";

const moduleName = "product";
const prefix = `${appName}/${moduleName}/`;
const ADD_PRODUCT = `${prefix}ADD_PRODUCT`;
const DELETE_PRODUCT = `${prefix}DELETE_PRODUCT`;

export const addProduct = name => ({
  type: ADD_PRODUCT,
  payload: { id: guid(), name, completed: false, createdDate: Date.now() } // id and createdDate to middleware?
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  payload: { id }
});

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCT:
      return [...state, { ...payload }];
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== payload.id);
    default:
      return state;
  }
};
