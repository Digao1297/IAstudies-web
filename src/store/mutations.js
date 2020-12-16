import * as types from "./mutations.types";

export default {
  [types.SET_RESULT](state, payload) {
    state.result = payload;
  },
  [types.SET_ROBOT](state, payload) {
    state.robot = payload;
  },
};
