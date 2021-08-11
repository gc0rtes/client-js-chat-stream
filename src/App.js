import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Components/Join";
import Chat from "./Components/Chat";

const App = () => (
  <Router>
    <Route exact path="/" component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
