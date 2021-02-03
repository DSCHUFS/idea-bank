import { Route, Switch } from "react-router";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
