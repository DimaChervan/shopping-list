import appName from "../config";
import guid from "../utils";

const moduleName = "product";
const prefix = `${appName}/${moduleName}/`;
const ADD_PRODUCT = `${prefix}ADD_PRODUCT`;
const DELETE_PRODUCT = `${prefix}DELETE_PRODUCT`;
const TOGGLE_PRODUCT = `${prefix}TOGGLE_PRODUCT`;
const PROCESS_ALL_PRODUCTS = `${prefix}PROCESS_ALL_PRODUCTS`;

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCT:
      return [...state, { ...payload }];
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== payload.id);
    case TOGGLE_PRODUCT:
      return state.map(product => {
        if (product.id === payload.id) {
          return {
            ...product,
            completed: !product.completed
          };
        }

        return product;
      });
    case PROCESS_ALL_PRODUCTS:
      return state.map(product => ({ ...product, completed: payload.completed }));
    default:
      return state;
  }
};

export const addProduct = name => ({
  type: ADD_PRODUCT,
  payload: { id: guid(), name, completed: false, createdDate: Date.now() } // id and createdDate to middleware?
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  payload: { id }
});

export const toggleProduct = id => ({
  type: TOGGLE_PRODUCT,
  payload: { id }
});

export const processAllProducts = (completed = false) => ({
  type: PROCESS_ALL_PRODUCTS,
  payload: { completed }
});

const FILTER_NAMES = {
  All: "All",
  Active: "Active",
  Completed: "Completed"
};

const FILTER_VALUES = {
  [FILTER_NAMES.Active]: false,
  [FILTER_NAMES.Completed]: true
};

export const getFilteredProducts = (products, filter) => {
  const filterValue = FILTER_VALUES[filter];

  if (typeof filterValue === "undefined") {
    return products;
  }

  return products.filter(item => item.completed === filterValue);
};
