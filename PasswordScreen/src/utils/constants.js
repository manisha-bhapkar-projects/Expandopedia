let API_URL = 'https://saas-qa.expandopedia.com/qa/user/api/';



export default {
    API: {
        BASEURL: {
            URL: API_URL,
        },
        BASENAME : '',

        PASSWORD:{
            CREATE_PASSWORD:"https://saas-qa.expandopedia.com/qa/user/api/user/user/activation",
            SET_USER_PROFILE:"https://saas-qa.expandopedia.com/qa/user/api/user/user/password"
        },
        
    },

    STORAGE: {
        AUTH: {
            TOKEN: "auth-token",
            REF_TOKEN: "refresh-token",
            ACCOUNT_DATA: "account-data",
            USER_DATA:"user-data",
            KEY_CLOCK_TOKEN:"key-clock-token",
        },
    },
    ROUTE: {
       
     PASSWORD:{
         PAGE_NOT_FOUND:"/page-not-found",
         CREATE_PASSWORD:"/code/:id",
         CONFIRM_ACCOUNT:"/confirm-account",
     }
    },
};