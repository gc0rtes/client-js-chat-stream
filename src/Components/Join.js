import { useState, useEffect } from "react";
import axios from "axios";
import { StreamChat } from "stream-chat";
import ChannelCard from "./ChannelCard";
import { PORT } from "../config/constants";

const Join = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [chatClient, setChatClient] = useState(null);
  const [channelType, setChannelType] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const [channelMembers, setChannelMembers] = useState([]);
  const [listOfChannels, setListOfChannels] = useState(null);

  console.log("api key", process.env.REACT_APP_API_KEY);
  // console.log("channelType:", channelType);
  // console.log("channelName:", channelName);
  // console.log("channelId:", channelId);
  // console.log("channelMembers:", channelMembers, typeof channelMembers);
  // console.log("token:", token);
  // console.log("what is client?", client)

  useEffect(() => {
    //Initialize client and setting current user
    const initializeClient = async () => {
      //Instantiate the app
      const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
      //open the WS connectio to start receive events
      await client.connectUser({ id: userId }, token);
      setChatClient(client);
    };
    //check if the user is loggedin already
    if (token && !chatClient) {
      initializeClient();
      console.log("initializeClient() was called");
    }

    //fetch channels and check if client is instantiated
    if (chatClient) {
      fetchChannels().then((r) => console.log(r));
      console.log("fetchChannels() was called");
    }
  }, [token, chatClient]);

  console.log("what is chatClient?", chatClient);
  //generate token on server
  async function generateToken(userId) {
    const response = await axios.get(
      `http://localhost:${PORT}/token?username=${userId}`
    );
    console.log("token response", response.data.token);
    setToken(response.data.token);
    return response.data.token;
  }

  function handleForm(e) {
    console.log("handleForm was called");
    e.preventDefault();
    generateToken(userId);
  }
  const disconnect = () => {
    if (!chatClient) {
      return null;
    }
    chatClient.disconnectUser();
    setToken(null);
  };

  //CREATE CHANNEL
  const createChannel = async (type, id, members, name) => {
    const channel = chatClient.channel(type, id, {
      members,
      name,
    });
    return channel.create();
  };

  //CREATE A CHANNEL
  function handleCreateChannel(e) {
    e.preventDefault();
    console.log("handleCreateChannel was called");

    // Split Method return string into an array
    const membersArr = channelMembers.split(",").map((member) => member.trim());
    console.log("what is membersArr?", membersArr);
    createChannel(channelType, channelId, membersArr, channelName).then((r) =>
      console.log(r)
    );
  }

  //QUERY Channels
  const fetchChannels = async () => {
    const filter = {
      members: { $in: [userId] },
      type: {
        $in: ["messaging", "livestream"],
      },
    };
    const result = await chatClient.queryChannels(filter);
    setListOfChannels(result);
    return result;
  };
  console.log(
    "what is listOfChannels",
    listOfChannels,
    Array.isArray(listOfChannels)
  );

  return (
    <div>
      <h2>Login as user</h2>
      <form>
        <input
          type="text"
          className="userId"
          placeholder="User name should be unique"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input type="submit" value="connect" onClick={handleForm} />
        <input type="button" value="disconnect" onClick={disconnect} />
      </form>
      <h2>Channels</h2>
      <h3>Create Channel</h3>
      <form>
        <div>
          <input
            type="text"
            placeholder="type of channel"
            onChange={(e) => setChannelType(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="channel id"
            onChange={(e) => setChannelId(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="channel name"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="user1, user2, user3..."
            onChange={(e) => setChannelMembers(e.target.value)}
          />
        </div>
        <input type="submit" onClick={handleCreateChannel} />
      </form>
      <div>
        <h2>Channels on this app</h2>
        <div className="container">
          {!listOfChannels
            ? "Login to load..."
            : listOfChannels.map((channel, key) => (
                <ChannelCard
                  key={key}
                  name={channel.data.name}
                  id={channel.data.id}
                  type={channel.type}
                  createdBy={channel.data.created_by.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Join;
