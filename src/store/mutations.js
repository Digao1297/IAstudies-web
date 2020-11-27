import * as types from "./mutations.types";

export default {
  [types.SET_MATRIX](state, payload) {
    state.matrix = payload;
  },
};
