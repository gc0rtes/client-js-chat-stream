import "./App.css";
import { Switch, Route } from "react-router-dom";

// Import pages
import LoginPage from "./Pages/LoginPage";
import Test from "./Pages/Test/Test";
import LobbyPage from "./Pages/LobbyPage";

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/lobby" component={LobbyPage} />
    <Route path="/test" component={Test} />
  </Switch>
);

export default App;
