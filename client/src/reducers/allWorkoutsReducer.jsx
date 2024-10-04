import { ACTION_TYPES } from "./actionTypes";

export const allWorkoutsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_WORKOUTS:
      return {
        workouts: action.payload,
      };
    case ACTION_TYPES.CREATE_WORKOUT:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    default:
      return {
        state,
      };
  }
};
