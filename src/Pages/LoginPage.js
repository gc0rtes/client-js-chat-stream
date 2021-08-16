import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Actions and Selectors
import { getChatClient } from "../store/login/actions";
import { selectChatClient } from "../store/login/selectors";

export default function LoginPage() {
  const dispatch = useDispatch();
  const chatClient = useSelector(selectChatClient);

  const [userId, setUserId] = useState("");
  // console.log("what is userId?", userId);

  const history = useHistory();

  useEffect(() => {
    if (chatClient) {
      history.push("/lobby");
    }
  }, [chatClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getChatClient(userId));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter userId"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
