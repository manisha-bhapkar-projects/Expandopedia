import "./App.css";
import "./css/main.css";
import "./css/bootstrap-grid.css";
import "./css/bootstrap-grid.min.css";
import "./css/bootstrap-reboot.css";
import "./css/bootstrap-reboot.min.css";
import "./css/bootstrap.css";
import "./css/bootstrap.min.css";
import "./css/login.css";
import "./css/main.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import constants from "./utils/constants";
import CreatePassword from "./Pages/Password/CreatePassword";
import ConfirmAccount from "./Pages/Password/ConfirmAccount";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { createBrowserHistory } from "history";
function App() {
  const history = createBrowserHistory({
  })

  return (
    <div>
      <NotificationContainer />
      <Router history={history}  basename="/password">
        <Switch>
          <Route
            exact
            path={constants.ROUTE.PASSWORD.CREATE_PASSWORD}
            component={CreatePassword}
          />
          <Route
            exact
            path={constants.ROUTE.PASSWORD.CONFIRM_ACCOUNT}
            component={ConfirmAccount}
          />
          <Route component={PageNotFound} />
         
        </Switch>
      </Router>
    </div>
  );
} 

export default App;
