import { combineReducers } from "redux";
import { eventChannel, buffers } from "redux-saga";
import { call, put, takeEvery, all, select, take, fork, cancel, flush } from "redux-saga/effects";
import appName from "../config";
import * as api from "../api";

// Constants
const moduleName = "products";
const prefix = `${appName}/${moduleName}/`;
const FETCH_PRODUCTS_REQUEST = `${prefix}FETCH_PRODUCTS_REQUEST`;
const FETCH_PRODUCTS_REQUEST_CANCELED = `${prefix}FETCH_PRODUCTS_REQUEST_CANCELED`;
// const FETCH_PRODUCTS_START = `${prefix}FETCH_PRODUCTS_START`;
const FETCH_PRODUCTS_SUCCESS = `${prefix}FETCH_PRODUCTS_SUCCESS`;
const SAVE_PRODUCT_REQUEST = `${prefix}SAVE_PRODUCT_REQUEST`;
const SAVE_PRODUCT_START = `${prefix}SAVE_PRODUCT_START`;
const SAVE_PRODUCT_SUCCESS = `${prefix}SAVE_PRODUCT_SUCCESS`;
const DELETE_PRODUCT_START = `${prefix}DELETE_PRODUCT_START`;
const DELETE_PRODUCT_REQUEST = `${prefix}DELETE_PRODUCT_REQUEST`;
const DELETE_PRODUCT_SUCCESS = `${prefix}DELETE_PRODUCT_SUCCESS`;
const TOGGLE_PRODUCT_START = `${prefix}TOGGLE_PRODUCT_START`;
const TOGGLE_PRODUCT_REQUEST = `${prefix}TOGGLE_PRODUCT_REQUEST`;
// const TOGGLE_PRODUCT_SUCCESS = `${prefix}TOGGLE_PRODUCT_SUCCESS`;
const PROCESS_ALL_PRODUCTS = `${prefix}PROCESS_ALL_PRODUCTS`;
const SET_VISIBILITY_FILTER = `${prefix}SET_VISIBILITY_FILTER`;

const productFilterKey = "completed";

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
      return { ...action.payload };
    case SAVE_PRODUCT_SUCCESS: {
      return {
        ...state,
        [payload.id]: payload
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      const newState = { ...state };
      delete newState[payload.id];
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

export const saveProduct = name => ({
  type: SAVE_PRODUCT_REQUEST,
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

const getFetchMethodByFilter = filter => {
  switch (filter) {
    case VISIBILITY_FILTERS.active:
      return () => api.fetchFilteredProducts(productFilterKey, false);
    case VISIBILITY_FILTERS.completed:
      return () => api.fetchFilteredProducts(productFilterKey, true);
    default:
      return api.fetchAllProducts;
  }
};

function* saveProductSaga({ payload }) {
  yield put({
    type: SAVE_PRODUCT_START
  });

  try {
    const updates = { ...payload, createdDate: Date.now() }; // firebase functions
    yield call(api.saveProduct, updates);
  } catch (error) {
    console.log(error);
  }
}

function* deleteProductSaga({ payload }) {
  yield put({
    type: DELETE_PRODUCT_START
  });

  try {
    const updates = {
      [payload.id]: null
    };

    yield call(api.deleteProduct, updates);
  } catch (error) {
    console.log(error);
  }
}

function* toggleProductSaga({ payload }) {
  yield put({
    type: TOGGLE_PRODUCT_START
  });

  const { id } = payload;
  const state = yield select(stateSelector);
  const product = state[id];

  try {
    const updates = { completed: !product.completed };

    yield call(api.toggleProduct, id, updates);
  } catch (error) {
    console.log(error);
  }
}

function createEventChannel(handler) {
  const listener = eventChannel(handler, buffers.expanding(1));

  return listener;
}

function* getDataAndListenToChannel(channelHandler, filter) {
  const chan = yield call(createEventChannel, channelHandler);
  try {
    try {
      const loadProducts = yield call(getFetchMethodByFilter, filter);
      const data = yield call(loadProducts);
      yield flush(chan);
      yield put({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.log("error");
    }
    while (true) {
      const data = yield take(chan);
      yield put({
        type: SAVE_PRODUCT_SUCCESS,
        payload: data
      });
    }
  } finally {
    chan.close();
  }
}

const getPayloadFromAction = ({ payload }) => payload;

function* watchProductListener(handler) {
  while (true) {
    let action = yield take(FETCH_PRODUCTS_REQUEST);
    let payload = yield call(getPayloadFromAction, action);
    let task = yield fork(getDataAndListenToChannel, handler, payload.filter);
    while (true) {
      action = yield take([FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_REQUEST_CANCELED]);
      yield cancel(task);

      if (action.type === FETCH_PRODUCTS_REQUEST) {
        payload = yield call(getPayloadFromAction, action);
        task = yield fork(getDataAndListenToChannel, handler, payload.filter);
      } else {
        break;
      }
    }
  }
}

function* watchProductRemoved() {
  const chan = yield call(createEventChannel, api.onProductRemoved);
  try {
    while (true) {
      const data = yield take(chan);
      yield put({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    console.log("err");
  }
}

export function* saga() {
  yield all([
    takeEvery(SAVE_PRODUCT_REQUEST, saveProductSaga),
    takeEvery(TOGGLE_PRODUCT_REQUEST, toggleProductSaga),
    takeEvery(DELETE_PRODUCT_REQUEST, deleteProductSaga),
    watchProductListener(api.onProductAdd),
    watchProductListener(api.onProductChanged),
    watchProductRemoved()
  ]);
}
