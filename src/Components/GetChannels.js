//Query Channels
export const GetChannels = async (client, setListOfChannels, userId) => {
  try {
    console.log("getChannels called");
    console.log("what is userId", userId);

    const filter = {
      $or: [
        { type: "livestream" },
        { type: "messaging", members: { $in: [userId] } },
      ],
    };

    // const filter = { members: { $in: [userId] } };

    const sort = { last_message_at: -1 };

    const result = await client.queryChannels(filter, sort);
    setListOfChannels(result);
    console.log("querychannels result", result);
    return result;
  } catch (error) {
    console.log("query channels failed", error);
  }
};
