import * as types from "./mutations.types";
import axios from "axios";

export const actionSetResult = async ({ commit }, payload) =>
  commit(types.SET_RESULT, payload);

export const actionSendRequest = async ({ dispatch }, payload) => {
  console.log(payload);
  axios
    .post(payload.url, { data: payload.request })
    .then((response) => {
      dispatch("actionSetResult", response.data);
    })
    .catch((error) => console.error(error));
};
