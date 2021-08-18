import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StreamChat } from "stream-chat";

//Actions and Selectors
import { selectChatClient } from "../store/login/selectors";

const API_KEY = process.env.REACT_APP_API_KEY;

// Instantiate the client with getInstance().
//   Obs: It doesn’t actually make an API call.
//   It is a constructor function to create a JS object with lots of functions.
const client = StreamChat.getInstance(API_KEY);

export default function LobbyPage() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const history = useHistory();
  const chatClient = useSelector(selectChatClient);

  // Check if the client is connected.
  // Obs: chatClient is the response from client.connectUser(userId, token)
  if (!chatClient) {
    history.push("/");
  }

  // Initialize a channel (hardcoded)
  const channel = client.channel("livestream", "general");

  // Watch channel
  const watchChannel = async () => {
    await channel.watch();
  };
  useEffect(() => {
    watchChannel();
  }, []); //empty array to run just once at mounting component

  // Function to get new messages
  useEffect(() => {
    channel.on("message.new", (event) => {
      //unpack values from array and add the new message
      setMessages([...messages, event.message]);
    });
  }, [messages]); //we want to run this only when messages array changes

  // Function for sending messages
  const sendNewMessage = async (message) => {
    await channel.sendMessage({ text: message });
  };
  // Function to handle submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent browswer to refresh when click on button
    sendNewMessage(newMessage);
    setNewMessage("");
  };

  console.log(newMessage, messages);

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

            {messages.map((message, index) => (
              <div key={index}>{`${message.user.id} > ${message.text}`}</div>
            ))}
          </div>
          <div className="border py-1">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="type your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button>send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
