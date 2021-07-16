import user from "./user"
import country from "./country"
import knowledgeBase from "./knowledgeBase"
import superAdminUserReducer from "./superAdminUser"
import searchResultReducer from "./searchResult"
import subscriptionData from './subscription'
import notification from "./notification"
import myAccountReducer from "./myAccount";
import HRTemplate from "./HRTemplate";
import favoriteCountriesReducer from "./favoriteCountries";

const reducers = { 
    user, 
    country , 
    superAdminUserReducer, 
    searchResultReducer, 
    notification ,
    knowledgeBase,
    myAccountReducer,
    favoriteCountriesReducer,
    subscriptionData,
    HRTemplate
};

export default reducers;