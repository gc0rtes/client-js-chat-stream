import axios from "axios";
const PORT = process.env.REACT_APP_PORT;

//Call endpoint to add member to channels
export const AddMemberChannels = async (userId, setAddMember) => {
  try {
    console.log("addMember called");
    console.log("what is userId", userId);

    const response = await axios.get(
      `http://localhost:${PORT}/add?userId=${userId}`
    );
    console.log("what is add member response?", response);
    setAddMember(response.data.status);
  } catch (error) {
    console.log("add member failed", error);
  }
};
