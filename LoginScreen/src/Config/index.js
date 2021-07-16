const envVariables = {
    development: {
        apiUrl: "https://saas-qa.expandopedia.com/qa/",
    },
    testing: {
        apiUrl: "https://saas-qa.expandopedia.com/qa/",
    },
    staging: {
        apiUrl: "https://saas-qa.expandopedia.com/qa/",
    },
    production: {
        apiUrl: "https://saas-qa.expandopedia.com/qa/",
    }
}

const commonConfig = {
    // variables common to all environments
}

const ENV = process.env.REACT_APP_ENV || "development"

export default {
    ...envVariables[ENV],
    ...commonConfig
}