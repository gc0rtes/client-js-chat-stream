// Subscribe (as a member) to default app channels
import { StreamChat } from "stream-chat";
const API_KEY = process.env.REACT_APP_API_KEY;
const client = StreamChat.getInstance(API_KEY);

export const SubscribeChannels = async (userId) => {
  const surf = client.channel("messaging", "surf");
  const skate = client.channel("messaging", "skate");
  try {
    await surf.addMembers([userId]);
    await skate.addMembers([userId]);
  } catch (error) {
    console.log("add members failed", error);
  }
};
