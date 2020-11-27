import * as types from "./mutations.types";

export const actionSetMatrix = async ({ commit }, payload) =>
  commit(types.SET_MATRIX, payload);
