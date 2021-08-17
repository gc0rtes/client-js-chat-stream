import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StreamChat } from "stream-chat";

//Actions and Selectors
import {
  selectChatClient,
  selectUserIdChatClient,
} from "../store/login/selectors";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function LobbyPage() {
  const [listOfChannels, setListOfChannels] = useState(null);
  const [message, setMessage] = useState("");
  const [renderTxt, setRenderTxt] = useState([]);
  console.log("renderTxt", renderTxt);

  const history = useHistory();
  const chatClient = useSelector(selectChatClient);
  const userId = useSelector(selectUserIdChatClient);
  //   console.log("userId", userId);

  if (!chatClient) {
    history.push("/");
  }
  //   console.log("chatClient", chatClient);

  const client = StreamChat.getInstance(API_KEY);

  // Initialize a channel
  const channel = client.channel("livestream", "general");

  // Watch a channel
  const watchChannel = async () => {
    await channel.watch();
    channel.on("message.new", (event) => {
      // handle change
      //   console.log("what is event?", event);
      console.log(`new message: ${event.message.text}`);
      const message = event.message.text;
      setRenderTxt([...renderTxt, { message }]);
    });
  };

  const sendNewMessage = async (message) => {
    await channel.sendMessage({ text: message });
  };

  //Query Channels
  const getChannels = async () => {
    //filter to pass into the query
    const filter = {
      members: { $in: [userId] },
      type: {
        $in: ["messaging", "livestream"],
      },
    };

    const result = await client.queryChannels(filter);
    setListOfChannels(result);
    return result;
  };
  //   console.log(
  //     "what is listOfChannels",
  //     listOfChannels,
  //     Array.isArray(listOfChannels)
  //   );
  //
  useEffect(() => {
    getChannels();
    watchChannel();
    console.log("useEffect");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewMessage(message);
  };

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
            <div>
              {renderTxt.map((text) => {
                return <p>{text.message}</p>;
              })}
            </div>
          </div>
          <div className="border py-1">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button>send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
