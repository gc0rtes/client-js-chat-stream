import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StreamChat } from "stream-chat";

//Actions and Selectors
import { selectChatClient } from "../store/login/selectors";

const API_KEY = process.env.REACT_APP_API_KEY;
const client = StreamChat.getInstance(API_KEY);

export default function LobbyPage() {
  const [listOfChannels, setListOfChannels] = useState(null);
  const history = useHistory();
  const chatClient = useSelector(selectChatClient);
  if (!chatClient) {
    history.push("/");
  }
  console.log("chatClient", chatClient);

  const userId = chatClient.me.id;
  console.log("userId", userId);

  //Create a channel

  const channel = client.channel("livestream", "lobby");
  console.log("what is channel?", channel);

  //   //   Query Channels
  const getChannels = async () => {
    //filter to pass into the query
    const filter = {
      members: { $in: [userId] },
      type: {
        $in: ["messaging", "livestream"],
      },
    };
    //query channels from API
    const result = await client.queryChannels(filter);
    setListOfChannels(result);
    return result;
  };
  console.log(
    "what is listOfChannels",
    listOfChannels,
    Array.isArray(listOfChannels)
  );

  useEffect(() => {
    getChannels().then((r) => console.log(r));
    console.log("fetchChannels() was called");
  }, []);

  return (
    <div className="container border">
      <h1>Lobby Page</h1>
      <div className="row border" style={{ height: "90vh" }}>
        <div className="col-3 border" style={{ height: "100%" }}>
          <h2>Channel list</h2>
          <div className="border">channel #1</div>
        </div>
        <div className="col-9 border">
          <div className="border" style={{ height: "95%" }}>
            <h2>Chat</h2>
          </div>
          <div className="border py-1">message</div>
        </div>
      </div>
    </div>
  );
}
