import { ACTION_TYPES } from "./actionTypes";

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INPUTS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
