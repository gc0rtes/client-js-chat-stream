import axios from "axios";
import { StreamChat } from "stream-chat";
const API_KEY = process.env.REACT_APP_API_KEY;
const PORT = process.env.REACT_APP_PORT;
const client = StreamChat.getInstance(API_KEY);

export const CHAT_CLIENT_CONNECTED = "CHAT_CLIENT_CONNECTED";

const chatClientConnected = (event) => ({
  type: CHAT_CLIENT_CONNECTED,
  payload: event,
});

export const getChatClient = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/token?username=${userId}`
      );
      //   console.log("token response", response.data.token);

      const chatClient = await client.connectUser(
        { id: userId },
        response.data.token
      );
      // console.log("what is chatClient", chatClient);

      dispatch(chatClientConnected(chatClient));
    } catch (err) {
      // use client.disconnect() before trying to connect as a different user
      console.log("client connection failed", err);
      client.disconnectUser();
    }
  };
};
