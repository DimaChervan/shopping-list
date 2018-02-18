import { combineReducers } from "redux";
import { call, put, takeEvery, all } from "redux-saga/effects";
import firebase from "firebase";
import appName from "../config";

// Constants
const moduleName = "product";
const prefix = `${appName}/${moduleName}/`;
const FETCH_ALL_REQUEST = `${prefix}FETCH_ALL_REQUEST`;
const FETCH_ALL_START = `${prefix}FETCH_ALL_START`;
const FETCH_ALL_SUCCESS = `${prefix}FETCH_ALL_SUCCESS`;
const ADD_PRODUCT_REQUEST = `${prefix}ADD_PRODUCT_REQUEST`;
const ADD_PRODUCT_START = `${prefix}ADD_PRODUCT_START`;
const ADD_PRODUCT_SUCCESS = `${prefix}ADD_PRODUCT_SUCCESS`;
const DELETE_PRODUCT = `${prefix}DELETE_PRODUCT`;
const TOGGLE_PRODUCT = `${prefix}TOGGLE_PRODUCT`;
const PROCESS_ALL_PRODUCTS = `${prefix}PROCESS_ALL_PRODUCTS`;
const SET_VISIBILITY_FILTER = `${prefix}SET_VISIBILITY_FILTER`;

export const VISIBILITY_FILTERS = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_ACTIVE: "SHOW_ACTIVE",
  SHOW_COMPLETED: "SHOW_COMPLETED"
};

// Reducers
const productsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_SUCCESS:
      return action.payload;
    case ADD_PRODUCT_SUCCESS:
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

const visibilityFilterReducer = (state = VISIBILITY_FILTERS.SHOW_ALL, action) => {
  const { type, payload } = action;

  if (type === SET_VISIBILITY_FILTER) {
    return payload.filter;
  }

  return state;
};

export default combineReducers({
  products: productsReducer,
  visibilityFilter: visibilityFilterReducer
});

// Actions
export const fetchAllProducts = () => ({
  type: FETCH_ALL_REQUEST
});

export const addProduct = name => ({
  type: ADD_PRODUCT_REQUEST,
  payload: { name, completed: false }
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

// Selectors
export const getProgress = products => {
  if (products.length === 0) {
    return 0;
  }

  return products.reduce((accum, { completed }) => accum + (completed ? 1 : 0), 0) / products.length * 100;
};

export const getFilteredProducts = (products, filter) => {
  switch (filter) {
    case VISIBILITY_FILTERS.SHOW_ALL:
      return products;
    case VISIBILITY_FILTERS.SHOW_ACTIVE:
      return products.filter(product => !product.completed);
    case VISIBILITY_FILTERS.SHOW_COMPLETED:
      return products.filter(product => product.completed);
    default:
      return products;
  }
};

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: { filter }
});

// Sagas
function* fetchAllSaga() {
  const ref = firebase.database().ref("products");

  yield put({
    type: FETCH_ALL_START
  });
  try {
    const snapshot = yield call([ref, ref.once], "value");

    const value = snapshot.val();

    const list = Object.keys(value).map(key => ({ id: key, ...value[key], createdDate: Date.now() }));

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: list
    });
  } catch (error) {
    console.log(error);
  }
}

function* addProdcutSaga({ payload }) {
  const ref = firebase.database().ref("products");

  yield put({
    type: ADD_PRODUCT_START
  });

  try {
    const { key } = yield call([ref, ref.push], payload);

    yield put({
      type: ADD_PRODUCT_SUCCESS,
      payload: { id: key, ...payload, createdDate: Date.now() } // this should do firebase by copmuted fields
    });
  } catch (error) {
    console.log(error);
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, fetchAllSaga), takeEvery(ADD_PRODUCT_REQUEST, addProdcutSaga)]);
}
