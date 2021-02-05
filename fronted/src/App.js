import { Route, Switch } from "react-router";
import DrawPage from "./pages/DrawPage";
import IdeaPage from "./pages/IdeaPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/draw" component={DrawPage} />
        <Route exact path="/idea" component={IdeaPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
