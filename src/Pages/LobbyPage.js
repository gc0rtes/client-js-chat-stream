import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StreamChat } from "stream-chat";
import moment from "moment";

// Components and functions
import { GetChannels } from "../Components/GetChannels";
import { AddMemberChannels } from "../Components/AddMemberChannels";

//Actions and Selectors
import {
  selectChatClient,
  selectUserIdChatClient,
} from "../store/login/selectors";

const API_KEY = process.env.REACT_APP_API_KEY;

// Instantiate the client with getInstance().
// Obs: It doesn’t actually make an API call.
// It is a constructor function to create a JS object with lots of functions.
const client = StreamChat.getInstance(API_KEY);

export default function LobbyPage() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [addMember, setAddMember] = useState(null);
  const [channels, setChannels] = useState(null);
  const [newChannel, setNewChannel] = useState("");

  const history = useHistory();
  const chatClient = useSelector(selectChatClient);
  const userId = useSelector(selectUserIdChatClient);

  // Check if the client is connected.
  // Obs: chatClient is the response from client.connectUser(userId, token)
  if (!chatClient) {
    history.push("/");
  }

  // Initialize a channel (hardcoded)
  const channel = client.channel("livestream", "general");

  // Watch channel
  const watchChannel = async () => {
    try {
      const state = await channel.watch();
      // console.log("what is state?", state);
    } catch (error) {
      console.log("watch channel failed", error);
    }
  };

  // Start to watch and addMember to default channels
  useEffect(() => {
    watchChannel();
    AddMemberChannels(userId, setAddMember);
  }, []);

  //Query channels
  useEffect(() => {
    //Check if new users were added before query
    if (addMember) {
      GetChannels(client, setChannels, userId);
    }
  }, [addMember]);

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

  console.log("channels", channels);
  console.log("newChannel", newChannel);
  console.log("addMember", addMember);

  return (
    <div className="container border">
      <h1>Lobby Page</h1>
      <div className="row border" style={{ height: "90vh" }}>
        <div className="col-3 border" style={{ height: "100%" }}>
          <h3>Channel list</h3>
          <div className="text-center">
            {!channels ? (
              <div className="spinner-border text-primary"></div>
            ) : (
              channels.map((channel, index) => (
                <button
                  type="button"
                  className="btn btn-primary btn-block p-1 m-1"
                  key={index}
                  onClick={() => setNewChannel(channel.id)}
                >
                  {channel.id}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="col-9 border">
          <div className="border" style={{ height: "93%" }}>
            <h2>Channel - </h2>

            {messages.map((message, index) => (
              // message.user.id === userId ? setToggleAlign("text-left") :  setToggleAlign("text-right");
              <div
                key={index}
                className={
                  message.user.id === userId ? "text-right" : "text-left"
                }
              >
                <div>{`${message.user.id} > ${message.text} (${moment(
                  message.created_at
                ).format("ll")} at ${moment(message.created_at).format(
                  "HH:mm"
                )})`}</div>
              </div>
            ))}
          </div>
          <div className="border py-1 row">
            <div className="col-9">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="type your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </form>
            </div>
            <div className="col-3">
              <button className="btn btn-primary">send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
