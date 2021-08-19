import axios from "axios";
import { StreamChat } from "stream-chat";

// Components and functions
// import { GetChannels } from "../Components/GetChannels";

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
      // Reponse is the token
      const response = await axios.get(
        `http://localhost:${PORT}/token?userId=${userId}`
      );
      //   console.log("token response", response.data.token);

      // Upgrade HTTP to WebSocket connection
      // Calling `connectUser()` with a user that has not been added to the app will automatically upsert the user for you.
      const chatClient = await client.connectUser(
        { id: userId },
        response.data.token
      );
      // console.log("what is chatClient", chatClient);

      //make it avaliable on global state
      dispatch(chatClientConnected(chatClient));
    } catch (error) {
      // use client.disconnect() before trying to connect as a different user
      console.log("client connection failed", error);
      client.disconnectUser();
    }
  };
};
