import { combineReducers } from "redux";
import { call, put, takeEvery, all, select } from "redux-saga/effects";
import firebase from "firebase";
import appName from "../config";

// Constants
const moduleName = "products";
const prefix = `${appName}/${moduleName}/`;
const FETCH_ALL_REQUEST = `${prefix}FETCH_ALL_REQUEST`;
const FETCH_ALL_START = `${prefix}FETCH_ALL_START`;
const FETCH_ALL_SUCCESS = `${prefix}FETCH_ALL_SUCCESS`;
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
    case DELETE_PRODUCT_REQUEST:
      return state.filter(product => product.id !== payload.id);
    case TOGGLE_PRODUCT_SUCCESS:
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
  [moduleName]: productsReducer,
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

const stateSelector = state => state[moduleName];

// Sagas
function* fetchAllSaga() {
  const ref = firebase.database().ref("products");

  yield put({
    type: FETCH_ALL_START
  });
  try {
    const snapshot = yield call([ref, ref.once], "value");

    const value = snapshot.val();
    const keys = value ? Object.keys(value) : [];

    const list = keys.map(key => ({ id: key, ...value[key] }));

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

  const [product] = state.filter(item => item.id === id); // todo rework this

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
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(ADD_PRODUCT_REQUEST, addProdcutSaga),
    takeEvery(DELETE_PRODUCT_REQUEST, deleteProdcutSaga),
    takeEvery(TOGGLE_PRODUCT_REQUEST, toggleProductSaga)
  ]);
}
