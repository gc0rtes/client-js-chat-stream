import "./LoginPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Functions and Components
// import { addMember } from "../store/login/addMember";

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
      // SubscribeChannels(userId);
      history.push("/lobby");
    }
  }, [chatClient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getChatClient(userId));
  };

  return (
    <div className="vertical-center">
      <div className="container text-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter userId"
            onChange={(e) => setUserId(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
