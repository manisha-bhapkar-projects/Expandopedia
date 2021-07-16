import Keycloak from "keycloak-js";
import { storeKeyClockToken } from "../utils/storage/index";

const _kc = new Keycloak({
  "realm": "expandopedia",
  "url": "https://saas-qa.expandopedia.com/auth",
  "ssl-required": "external",
  "resource": "expandopedia-client",
  "public-client": true,
  "verify-token-audience": true,
  "confidential-port": 0,
  "clientId": "expandopedia-client"
});

/**
* Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
*
* @param onAuthenticatedCallback
*/

const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/login',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      console.log("Auth  " + authenticated);
      // console.log("token in init ", _kc.token);
      storeKeyClockToken(_kc.token);
      if (authenticated) {
        localStorage.setItem("logout_url", _kc.createLogoutUrl())
        onAuthenticatedCallback(true);
      } else {
        doLogin();
      }
    })
};


const userDetails = _kc.userInfo;

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  userDetails
};

export default UserService;

