import { Route, Switch } from "react-router";
import DrawPage from "./pages/DrawPage";
import IdeaPage from "./pages/IdeaPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/draw" component={DrawPage} />
        <Route exact path="/idea" component={IdeaPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
