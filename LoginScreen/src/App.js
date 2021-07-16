// import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./assets/css/main.css";
import "./assets/css/login.css";
import "react-notifications/lib/notifications.css";
import "./assets/scss/bootstrap-grid.scss";
import "./assets/scss/bootstrap-reboot.scss";
import "./assets/scss/bootstrap.scss";
// import "./assets/scss/custome.scss";
import "./assets/scss/searchResult.scss";
import "./assets/scss/responsive.scss";
import "./assets/scss/main.scss";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import NotificationWrapper from "./utils/commonNotifications";
import { createBrowserHistory } from "history";
import Router from "./Router";
import store from "./Store";

function App() {
	const history = createBrowserHistory;
	return (
		<Provider store={store}>
			<NotificationWrapper>
				<HashRouter history={history} basename="/login">
					<Router />
				</HashRouter>
			</NotificationWrapper>
		</Provider>
	);
}

export default App;
