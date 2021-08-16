/* eslint-disable import/no-anonymous-default-export */
import { CHAT_CLIENT_CONNECTED } from "./actions";

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHAT_CLIENT_CONNECTED:
      //   console.log("what is payload?", payload);
      return { ...state, ...payload };
    default:
      return state;
  }
};
