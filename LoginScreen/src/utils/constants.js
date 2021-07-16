import config from "../Config";

const API_URL = config.apiUrl;

export default {
	STATIC_API_CALL: false,
	API: {
		BASEURL: {
			URL: API_URL,
		},

		PASSWORD: {
			CREATE_PASSWORD: "user/api/user/user/all",
			SET_USER_PROFILE: "user/api/user/User/profile",
		},

		SEARCH_RESULT: {
			GET_SEARCH_RESULT:
				"fulltextsearch/api/fulltextsearch/search/search/",
		},

		USER: {
			GET_PULSE_MAP_CONTENT: "common/api/common/heatmap  ",
			GET_USER_PROFILE: "user/api/user/user/keycloakid/",
			UPDATE_USER_PROFILE: "user/api/user/User/profile/",
			UPLOAD_PROFILE_PIC:
				"https://saas-qa.expandopedia.com/qa/document/api/file/upload",
			ADD_COWORKERS: "user/api/user/user/coworker",
			COWORKERS_LIST: "user/api/user/User/coworker/coworkerslist/",
			GET_INDUSTRY_LIST: "user/api/industry/all",
			GET_COMPANY_LIST: "user/api/company/all?skipPagination=true",
			DELETE_USER: "user/api/user/User/",
			UPDATE_LAST_LOGIN: "user/api/user/user/lastlogin/",
			GET_PRIMARY_USER: "user/api/user/user/company/primaryuser/",
			DELETE_PROFILE_PIC: "document/api/file/",
		},
		COUNTRY: {
			GET_COUNTRY_LIST: "common/api/common/country/all",
			GET_ALL_COUNTRY_INFO_LIST:
				"content/api/content/snapshot/allcountry",
			GET_REGION_LIST: "common/api/common/region/all",
			GET_SPECIFIC_REGION_LIST: "common/api/common/country/all",
			GET_FAVOURITE_COUNTRY:
				"user/api/user/user/employeecountry/949babab-f85f-454a-b890-717b39ec5eaa",

			CREATE_NEW_COUNTRY: "common/api/common/country",
			UPDATE_COUNTRY_BY_ID: "common/api/common/country/",
			ADD_NEW_COUNTRY_BY_ID: "common/api/common/country",
			UPDATE_COUNTRY_STATUS:
				"common/api/common/Country/activate/{country_id}?active=",
			FILE_UPLOAD: "document/api/file/upload",
			GET_USER_COUNTRY: "user/api/user/user/employeecountry/",
			GET_EMPLOYEE_TYPE: "user/api/user/User/emloyeetype",
			GET_EMPLOYEE_COUNTRY: "user/api/user/user/employeecountry/",
			PDF_CREATE: "pdfcreator/api/pdfcreator/createpdf/",
			GET_ALL_TOPIC: "pdfcreator/api/pdfcreator/createpdf/",
			ADD_COUNTRY: "user/api/user/user/usercountry",
			GET_FLAG_DOWNLOAD: `${API_URL}document/api/file/download/`,
			DELETE_COUNTRY: "user/api/user/user/usercountry/",
			PUBLIC_HOLIDAYS: "content/api/HolidayCalendar/publicholidays",
			GET_EMPLOYEE_LIFECYCLE:
				"content/api/content/allsolutions?listcount=5",
			ADD_SINGLE_FAV_COUNTRY: "user/api/user/user/usercountry/",
			GET_HOLIDAY_LIST: "content/api/HolidayCalendar/publicholidays/",
		},
		SUPER_ADMIN_USER: {
			ADD_SUPER_ADMIN: "user/api/user/User",
			UPDATE_SUPER_ADMIN: "user/api/user/User/",
			GET_ADMINISTRATOR_ROLE: "user/api/user/user/role",
			GET_USER_LIST: "user/api/user/Admin/listing",
			CHANGE_USER_STATUS: "user/api/user/User/activate/",
			SEND_EMAIL_TO_CHANGE_STATUS: "notification/api/email/activation",
		},
		// https://saas-qa.expandopedia.com/qa/user/api/user/user/usercountry

		HOME: {
			GET_COUNTRY_LIST: "user/api/user/User/usercountry/",
			GET_POPULAR_COUNTRIES: "content/api/content/allsolutions",
			GET_SUPER_TOPICS: "content/api/Content/supertopic/solution",
			GET_SUPER_TOPIC_TAG: "content/api/content/supertopics",
			GET_ALERT: "content/api/Content/alerts/",
			GET_SOLUTION: "content/api/Content/Published/solution",
		},
		DETAILS: {
			GET_ALERTS_LIST: "content/api/Content/alerts/",
			GET_SUPER_TOPICS: "content/api/Content/snapshot",
			GET_COUNTRY_DETAISL: "common/api/common/country",
			GET_SPECIFICS_DATA: "content/api/Content/Published/solution",
			GET_PUBLISHED_SOLUTION: "content/api/Content/Published/solution",
			GET_COUNTRY_BULLETCHART: "common/api/common/indicators",
		},
		ROLES: {
			GET_ROLES_LIST: "user/api/role/all",
			GET_USERS_FEAT: "user/api/role/features",
			GET_USER_GROUP: "user/api/role/usergroups",
			POST_USER_DATA: "user/api/role",
		},
		KNOWLEDGE_BASE: {
			GET_ARTICLE_DETAILS: "user/api/role/all",
			GET_INSIGHTS_LIST: "user/api/role/features",
			GET_ARTICLES:"content/api/content/articles",
            
            GET_ALL_FAQS: "content/api/content/articles",
            GET_FEATURED_ARTICLES: "content/api/content/articles",
            GET_QUICK_LINKS: "user/api/role/features",
            GET_TAGS: "user/api/role/features",
		},
        SUBSCRIPTION:{
            GET_ALL_LIST:"/license/api/Subscription/all",
            GET_FEAT_LIST:"/license/api/Subscription/features",
            POST_DATA:"license/api/subscription",
            GET:"license/api/Subscription"
		},
		HR_TEMPLATE:{
			GET_ALL_DOCUMENT_LIST:"document/api/document/all/",
			GET_CART_DETAILS:"purchase/api/purchase/cart/",
			GET_LANGUAGE_LIST:"common/api/common/language/all",
			GET_ALL_CATEGORY_LIST:"document/api/documentcategory/all"
		}
		
	},
	IMAGE: {
		DOWNLOAD: `${API_URL}document/api/file/download/`,
	},
	STORAGE: {
		AUTH: {
			TOKEN: "auth-token",
			ACCOUNT_DATA: "account-data",
			USER_DATA: "user-data",
			KEY_CLOCK_TOKEN: "key-clock-token",
			COUNTRY_DATA: "country-data",
			KEY_CLOCK_USER_ID: "key-clock-user-id",
			USER_PORFILE: "user-profile",
			ABOUT_YOU: "about-you",
			COUNTRY_SELECTION: "country-selection",
			EMPLOYEE_INFO: "employee-info",
			ADD_USER: "add-user",
			LAST_LOGIN_ATTEMPTED: "exp_last_login",
			KEY_CLOCK_ID: "key_clock_id",
		},
	},
	ROUTE: {
		SIDEBAR: {
			HOME: "/home",
			SETTINGS: {
				USERLIST: "/settings/users",
				ADD_USER: "/settings/users/add-user",
				SEARCH_PAGE: "/settings/search/result",
				EDIT_USER: "/settings/users/edit-user/",
				EDIT_USER_BY_ID: "/settings/users/edit-user/:id",
				ADD_ROLE: "/settings/roles",
				COUNTRY_CONFIGURATION: "/country-configuration",
				COUNTRY_CONFIGURATION_VIEW: "/country-configuration-view",
				MY_ACCOUNT: "/settings/my-account",
				FAVORITE_COUNTRIES: "/favorite-countries",
				ADD_COUNTRY: "/settings/add-country",
			},
			KNOWLEDGE_BASE: {
				HOME: "/knowledge-base",
			},
		},
		USER: {
			ADD_USER: "/add-user",
			USER_PROFILE: "/",
			USER_PROFILE_HASH: "/:id/",
		},
		COUNTRY: {
			COUNTRY: "/country",
			ALL_COUNTRY: "/all-country",
			UN_FAVORITE_COUNTRIES: "/unfavorite-countries/:id",
		},
		LOCATION: {
			LOCATION: "/location",
		},
		SUCCESS: {
			SUCCESS: "/success",
		},
		PASSWORD: {
			WELCOME: "/welcome",
		},
		HOME_PAGE: {
			HOME: "/home",
		},
		DETAILS_PAGE: {
			DETAILS: "/details/:id",
			CUSTOM_HOME_DETAILS: "/details/:country/:id",
			CUSTOM_UN_FAV_COUNTRY_DETAILS: "/unfavorite-countries/:country/:id",
		},
		COUNTRY_COMPARE: {
			COMPARE: "/CountryCompare",
		},
		ROLES_PAGE: {
			ROLES: "/roles",
			CREATE_ROLES: "/create-role",
			VIEW_ROLES: "/view-role/:id",
			EDIT_ROLES: "/edit-role/:id",
		},
		KNOWLEDGE_BASE: {
			HOME: "/knowledge-base",
			INSIGHTS_ANALYSIS: "/insights-and-analysis",
			ARTICLE_LANDING: "/article-details",
			ARTICLE_PAGE: "/article-page", //newly created
			FAQ: "/frequently-asked",
		},
		SUBSCRIPTIONS: "/subscriptions",
		SUBSCRIPTION_PAGE: {
			ALL: "/subscription-list",
			CREATE: "/create-subscription",
			EDIT: "/edit-subscription/:id",
			VIEW: "/view-subscription/:id",
		},
		HR_TEMPLATE_PAGE: {
			DOC_SHOP: "/doc-shop",
			IN_YOUR_CART: "/your-cart",
			REVIEW_PAYMENT: "/review-and-pay",
			PAYMENT_SUCCESS: "/payment-success",
		},
	},
};
