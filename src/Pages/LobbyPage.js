import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Actions and Selectors
import { selectChatClient } from "../store/login/selectors";

export default function LobbyPage() {
  const history = useHistory();
  const [listOfChannels, setListOfChannels] = useState(null);
  const chatClient = useSelector(selectChatClient);
  console.log(chatClient);
  if (!chatClient) {
    history.push("/");
  }
  //   const userId = chatClient.me.id;

  //Fetch Channels
  //   const fetchChannels = async () => {
  //     //filter to pass into the query
  //     const filter = {
  //       members: { $in: [userId] },
  //       type: {
  //         $in: ["messaging", "livestream"],
  //       },
  //     };
  //     //query channels from API
  //     const result = await chatClient.queryChannels(filter);
  //     setListOfChannels(result);
  //   };
  //   console.log(
  //     "what is listOfChannels",
  //     listOfChannels,
  //     Array.isArray(listOfChannels)
  //   );

  //   useEffect(() => {
  //     fetchChannels();
  //   }, []);

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
