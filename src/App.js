import "./App.css";
import { Switch, Route } from "react-router-dom";

// Import pages
import Join from "./Pages/Join";
import Test from "./Pages/Test";
import LandPage from "./Pages/LandPage";
import LobbyPage from "./Pages/LobbyPage";

const App = () => (
  <Switch>
    <Route exact path="/" component={LandPage} />
    <Route path="/lobby" component={LobbyPage} />
    <Route path="/join" component={Join} />
    <Route path="/test" component={Test} />
  </Switch>
);

export default App;
