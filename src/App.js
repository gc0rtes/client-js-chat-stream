import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Pages/Join";
import Test from "./Pages/Test";
import LandPage from "./Pages/LandPage";
import LobbyPage from "./Pages/LobbyPage";

const App = () => (
  <Router>
    <Route exact path="/" component={LandPage} />
    <Route path="/lobby" component={LobbyPage} />
    <Route path="/join" component={Join} />
    <Route path="/test" component={Test} />
  </Router>
);

export default App;
