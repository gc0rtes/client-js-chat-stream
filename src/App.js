import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Pages/Join";
import Chat from "./Pages/Chat";
import Test from "./Pages/Test";

const App = () => (
  <Router>
    <Route exact path="/" component={Join} />
    <Route path="/chat" component={Chat} />
    <Route path="/test" component={Test} />
  </Router>
);

export default App;
