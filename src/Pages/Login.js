import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { StreamChat } from "stream-chat";
const API_KEY = process.env.REACT_APP_API_KEY;
const PORT = process.env.REACT_APP_PORT;
const client = StreamChat.getInstance(API_KEY);

export default function Login() {
  const [userId, setUserId] = useState("");
  // console.log("what is userId?", userId);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    getTokenAndConnect(userId);
  };

  const getTokenAndConnect = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/token?username=${userId}`
      );
      console.log("token response", response.data.token);

      const clientConnection = await client.connectUser(
        { id: userId },
        response.data.token
      );
      console.log("what is clientConnection", clientConnection);

      if (clientConnection) {
        console.log("clientConnection is active!");
        history.push("/lobby");
      }
      //   : console.log("clientConnection is inactive!");
    } catch (err) {
      // use client.disconnect() before trying to connect as a different user
      console.log("fetch failed", err);
      client.disconnectUser();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter userId"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
