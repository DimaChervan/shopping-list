import appName from "../config";

const moduleName = "visibilityFilter";
const prefix = `${appName}/${moduleName}/`;
const SET_VISIBILITY_FILTER = `${prefix}SET_VISIBILITY_FILTER`;
const FILTER_NAMES = {
  All: "All",
  Active: "Active",
  Completed: "Completed"
};

// const FILTER_VALUES = {
//   [FILTER_NAMES.Active]: false,
//   [FILTER_NAMES.Completed]: true
// };

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: { filter }
});

export default (state = FILTER_NAMES.All, action) => {
  const { type, payload } = action;

  if (type === SET_VISIBILITY_FILTER) {
    return payload.filter;
  }

  return state;
};
