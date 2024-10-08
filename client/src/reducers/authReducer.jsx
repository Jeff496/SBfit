import { ACTION_TYPES } from "./actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return { user: action.payload };
    case ACTION_TYPES.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};
