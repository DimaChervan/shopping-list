import { combineReducers } from "redux";
import { call, put, takeEvery, all, select } from "redux-saga/effects";
import firebase from "firebase";
import appName from "../config";
import { fetchAllProducts, fetchFilteredProducts } from "../api";

// Constants
const moduleName = "products";
const prefix = `${appName}/${moduleName}/`;
const FETCH_PRODUCTS_REQUEST = `${prefix}FETCH_PRODUCTS_REQUEST`;
const FETCH_PRODUCTS_START = `${prefix}FETCH_PRODUCTS_START`;
const FETCH_PRODUCTS_SUCCESS = `${prefix}FETCH_PRODUCTS_SUCCESS`;
const ADD_PRODUCT_REQUEST = `${prefix}ADD_PRODUCT_REQUEST`;
const ADD_PRODUCT_START = `${prefix}ADD_PRODUCT_START`;
const ADD_PRODUCT_SUCCESS = `${prefix}ADD_PRODUCT_SUCCESS`;
const DELETE_PRODUCT_START = `${prefix}DELETE_PRODUCT_START`;
const DELETE_PRODUCT_REQUEST = `${prefix}DELETE_PRODUCT_REQUEST`;
const DELETE_PRODUCT_SUCCESS = `${prefix}DELETE_PRODUCT_SUCCESS`;
const TOGGLE_PRODUCT_START = `${prefix}TOGGLE_PRODUCT_START`;
const TOGGLE_PRODUCT_REQUEST = `${prefix}TOGGLE_PRODUCT_REQUEST`;
const TOGGLE_PRODUCT_SUCCESS = `${prefix}TOGGLE_PRODUCT_SUCCESS`;
const PROCESS_ALL_PRODUCTS = `${prefix}PROCESS_ALL_PRODUCTS`;
const SET_VISIBILITY_FILTER = `${prefix}SET_VISIBILITY_FILTER`;

export const VISIBILITY_FILTERS = {
  all: "",
  active: "active",
  completed: "completed"
};

// Reducers
const productsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload };
    case ADD_PRODUCT_SUCCESS: {
      const newState = { ...state };
      newState[payload.id] = payload;
      return newState;
    }

    case DELETE_PRODUCT_REQUEST: {
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    }
    case TOGGLE_PRODUCT_SUCCESS: {
      const { id } = payload;
      const newState = { ...state };
      newState[id].completed = !newState[id].completed;
      return newState;
    }
    case PROCESS_ALL_PRODUCTS: {
      const completed = { payload };
      const newState = { ...state };

      Object.keys(newState).forEach(id => ({ ...newState[id], completed }));

      return newState;
    }
    default:
      return state;
  }
};

const visibilityFilterReducer = (state = VISIBILITY_FILTERS.all, action) => {
  const { type, payload } = action;

  if (type === SET_VISIBILITY_FILTER) {
    return payload.filter;
  }

  return state;
};

export default combineReducers({
  [moduleName]: productsReducer,
  visibilityFilter: visibilityFilterReducer
});

// Actions
export const fetchProducts = filter => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: { filter }
});

export const addProduct = name => ({
  type: ADD_PRODUCT_REQUEST,
  payload: { name, completed: false }
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: { id }
});

export const toggleProduct = id => ({
  type: TOGGLE_PRODUCT_REQUEST,
  payload: { id }
});

export const processAllProducts = (completed = false) => ({
  type: PROCESS_ALL_PRODUCTS,
  payload: { completed }
});

// Selectors
const getProductsArray = products => Object.keys(products).map(id => ({ id, ...products[id] }));

export const getProgress = products => {
  const productsArr = getProductsArray(products);
  if (productsArr.length === 0) {
    return 0;
  }

  return productsArr.reduce((accum, { completed }) => accum + (completed ? 1 : 0), 0) / productsArr.length * 100;
};

export const getFilteredProducts = (products, filter) => {
  const productsArr = getProductsArray(products);
  switch (filter) {
    case VISIBILITY_FILTERS.all:
      return productsArr;
    case VISIBILITY_FILTERS.active:
      return productsArr.filter(product => !product.completed);
    case VISIBILITY_FILTERS.completed:
      return productsArr.filter(product => product.completed);
    default:
      return productsArr;
  }
};

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: { filter }
});

const stateSelector = state => state[moduleName];

const getFetchMethodByFilter = (filter) => {
  switch (filter) {
    case 'active':
      return () => fetchFilteredProducts(false);
    case 'completed':
      return () => fetchFilteredProducts(true);
    default:
      return fetchAllProducts;
  }
}

// Sagas
function* fetchProductsSaga({ payload }) {
  yield put({
    type: FETCH_PRODUCTS_START
  });

  const { filter } = payload;
  const loadProducts = getFetchMethodByFilter(filter);

  try {
    const snapshot = yield call(loadProducts);
    const value = snapshot.val();

    yield put({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: value || {}
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
    const updates = { ...payload, createdDate: Date.now() }; // firebase functions
    const { key } = yield call([ref, ref.push], updates);

    yield put({
      type: ADD_PRODUCT_SUCCESS,
      payload: { id: key, ...updates }
    });
  } catch (error) {
    console.log(error);
  }
}

function* deleteProdcutSaga({ payload }) {
  const ref = firebase.database().ref("products");

  yield put({
    type: DELETE_PRODUCT_START
  });

  try {
    const updates = {
      [payload.id]: null
    };

    yield call([ref, ref.update], updates);

    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      payload
    });
  } catch (error) {
    console.log(error);
  }
}

function* toggleProductSaga({ payload }) {
  const { id } = payload;
  const ref = firebase.database().ref(`products/${id}`);

  yield put({
    type: TOGGLE_PRODUCT_START
  });

  const state = yield select(stateSelector);

  const product = state[id];

  try {
    const updates = { completed: !product.completed };

    yield call([ref, ref.update], updates);

    yield put({
      type: TOGGLE_PRODUCT_SUCCESS,
      payload
    });
  } catch (error) {
    console.log(error);
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeEvery(ADD_PRODUCT_REQUEST, addProdcutSaga),
    takeEvery(DELETE_PRODUCT_REQUEST, deleteProdcutSaga),
    takeEvery(TOGGLE_PRODUCT_REQUEST, toggleProductSaga)
  ]);
}
