/* eslint-disable no-unused-vars */
import * as types from "./mutations.types";
import axios from "axios";

export const actionSetResult = async ({ commit }, payload) =>
  commit(types.SET_RESULT, payload);

export const actionSetRobot = async ({ commit }, payload) =>
  commit(types.SET_ROBOT, payload);

export const actionSendRequest = async ({ dispatch }, payload) => {
  console.log(payload);
  axios
    .post(payload.url, { data: payload.package })
    .then((response) => {
      dispatch("actionSetResult", response.data.result);
      dispatch("actionSetRobot", response.data.robot);
    })
    .catch((error) => console.error(error));
};
