export default function LobbyPage() {
  //     //QUERY Channels
  //   const fetchChannels = async () => {
  //     const filter = {
  //       members: { $in: [userId] },
  //       type: {
  //         $in: ["messaging", "livestream"],
  //       },
  //     };
  //     const result = await chatClient.queryChannels(filter);
  //     setListOfChannels(result);
  //     return result;
  //   };
  //   console.log(
  //     "what is listOfChannels",
  //     listOfChannels,
  //     Array.isArray(listOfChannels)
  //   );

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
