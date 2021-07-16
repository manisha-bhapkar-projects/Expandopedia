import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import Layout from "../Components/Layout/Layout";
import Loader from "../Components/Loader";
import constants from "../utils/constants";
import { getKeyClockToken_Data } from "../utils/storage";
import { useDispatch } from "react-redux";
import { notifyAction } from "../Store/reducers/notification";

const userToken = getKeyClockToken_Data();

const PublicRoute = ({
	component: Component,
	layoutSettings = {},
	path = "",
	...rest
}) => {
	const dispatch = useDispatch();
	const notify = (message, timeOut) => {
		dispatch(notifyAction({ message, timeOut }));
	};
	return (
		<Route
			{...rest}
			path={[path, `/:hash/${path}`]}
			component={() => (
				<Layout settings={layoutSettings}>
					<Component notify={notify} />
				</Layout>
			)}
		/>
	);
};

const RestrictedRoute = ({
	component: Component,
	layoutSettings = {},
	path = "",
	...rest
}) => {
	const dispatch = useDispatch();

	if (!userToken) return <Redirect to="/" />;

	const notify = (message, timeOut) => {
		dispatch(notifyAction({ message, timeOut }));
	};
	return (
		<Route
			{...rest}
			path={[path, `/:hash/${path}`]}
			component={(routerProps) => (
				<Layout settings={layoutSettings} {...routerProps}>
					<Component notify={notify} {...routerProps} />
				</Layout>
			)}
		/>
	);
};

export default function Router() {
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<PublicRoute
					exact
					layoutSettings={{
						isUserRegistration: true,
					}}
					path={constants.ROUTE.USER.USER_PROFILE}
					component={lazy(() => import("../Pages/User/UserProfile"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						isUserRegistration: true,
					}}
					path={constants.ROUTE.USER.ADD_USER}
					component={lazy(() => import("../Pages/User/AddUser"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						isUserRegistration: true,
					}}
					path={constants.ROUTE.LOCATION.LOCATION}
					component={lazy(() => import("../Pages/Location"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						isUserRegistration: true,
					}}
					path={constants.ROUTE.COUNTRY.COUNTRY}
					component={lazy(() => import("../Pages/Country"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "home",
						},
					}}
					path={constants.ROUTE.HOME_PAGE.HOME}
					component={lazy(() => import("../Pages/Home"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "home",
						},
					}}
					path={constants.ROUTE.DETAILS_PAGE.DETAILS}
					component={lazy(() => import("../Pages/CountryDetails"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "globe",
						},
					}}
					path={constants.ROUTE.DETAILS_PAGE.CUSTOM_HOME_DETAILS}
					component={lazy(() => import("../Pages/CountryDetails"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "home",
						},
					}}
					path={constants.ROUTE.COUNTRY_COMPARE.COMPARE}
					component={lazy(() => import("../Pages/CountryCompare"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.USERLIST}
					component={lazy(() => import("../Pages/Settings/UserList"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.ADD_USER}
					component={lazy(() =>
						import("../Pages/Settings/SuperAdminAddUser")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.EDIT_USER_BY_ID}
					component={lazy(() =>
						import("../Pages/Settings/SuperAdminEditUser")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.SEARCH_PAGE}
					component={lazy(() =>
						import("../Pages/Settings/SearchResultPage")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.ROLES_PAGE.ROLES}
					component={lazy(() => import("../Pages/Roles/Managerole"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "create-roles",
						},
					}}
					path={constants.ROUTE.ROLES_PAGE.CREATE_ROLES}
					component={lazy(() => import("../Pages/Roles/Createrole"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "view-role",
						},
					}}
					path={constants.ROUTE.ROLES_PAGE.VIEW_ROLES}
					component={lazy(() => import("../Pages/Roles/Viewroles"))}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "edit-role",
						},
					}}
					path={constants.ROUTE.ROLES_PAGE.EDIT_ROLES}
					component={lazy(() => import("../Pages/Roles/EditRoles"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "book",
						},
					}}
					path={constants.ROUTE.KNOWLEDGE_BASE.HOME}
					component={lazy(() =>
						import("../Pages/KnowledgeBase/knowledgeHome")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={
						constants.ROUTE.SIDEBAR.SETTINGS.COUNTRY_CONFIGURATION
					}
					component={lazy(() =>
						import(
							"../Pages/Settings/Countries/CountryConfigurationList"
						)
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={
						constants.ROUTE.SIDEBAR.SETTINGS
							.COUNTRY_CONFIGURATION_VIEW
					}
					component={lazy(() =>
						import(
							"../Pages/Settings/Countries/CountryConfigurationView"
						)
					)}
				/>
				{/* newly created route */}
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "book",
						},
					}}
					path={constants.ROUTE.KNOWLEDGE_BASE.INSIGHTS_ANALYSIS}
					component={lazy(() =>
						import("../Pages/KnowledgeBase/InsightsAndAnalysis")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "globe",
						},
					}}
					path={constants.ROUTE.COUNTRY.ALL_COUNTRY}
					component={lazy(() =>
						import("../Pages/AllCountry/AllCountry")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "globe",
						},
					}}
					path={constants.ROUTE.COUNTRY.UN_FAVORITE_COUNTRIES}
					component={lazy(() =>
						import("../Pages/AllCountry/UnFavoriteCountries/index")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "globe",
						},
					}}
					path={
						constants.ROUTE.DETAILS_PAGE
							.CUSTOM_UN_FAV_COUNTRY_DETAILS
					}
					component={lazy(() =>
						import("../Pages/AllCountry/UnFavoriteCountries/index")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "book",
						},
					}}
					path={constants.ROUTE.KNOWLEDGE_BASE.ARTICLE_PAGE}
					component={lazy(() =>
						import("../Pages/KnowledgeBase/ArticlePage")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "book",
						},
					}}
					path={constants.ROUTE.KNOWLEDGE_BASE.FAQ}
					component={lazy(() =>
						import("../Pages/KnowledgeBase/FrequentlyAsked")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "home",
						},
					}}
					path={constants.ROUTE.SUBSCRIPTIONS}
					component={lazy(() => import("../Pages/Subscriptions"))}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.MY_ACCOUNT}
					component={lazy(() =>
						import("../Pages/Settings/MyAccount/index")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.FAVORITE_COUNTRIES}
					component={lazy(() =>
						import("../Pages/Settings/FavoriteCounries/index")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "settings",
						},
					}}
					path={constants.ROUTE.SIDEBAR.SETTINGS.ADD_COUNTRY}
					component={lazy(() =>
						import("../Pages/Settings/FavoriteCounries/AddCountry")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "home",
						},
					}}
					path={constants.ROUTE.KNOWLEDGE_BASE.ARTICLE_PAGE}
					component={lazy(() =>
						import("../Pages/KnowledgeBase/ArticlePage")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "subscription",
						},
					}}
					path={constants.ROUTE.SUBSCRIPTION_PAGE.ALL}
					component={lazy(() =>
						import("../Pages/Subscription/Index")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "subscription",
						},
					}}
					path={constants.ROUTE.SUBSCRIPTION_PAGE.CREATE}
					component={lazy(() =>
						import("../Pages/Subscription/create")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "subscription",
						},
					}}
					path={constants.ROUTE.SUBSCRIPTION_PAGE.VIEW}
					component={lazy(() => import("../Pages/Subscription/view"))}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "subscription",
						},
					}}
					path={constants.ROUTE.SUBSCRIPTION_PAGE.EDIT}
					component={lazy(() => import("../Pages/Subscription/edit"))}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "cart",
						},
					}}
					path={constants.ROUTE.HR_TEMPLATE_PAGE.DOC_SHOP}
					component={lazy(() =>
						import("../Pages/HRTemplates/HRTemplateDocShop")
					)}
				/>
				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "cart",
						},
					}}
					path={constants.ROUTE.HR_TEMPLATE_PAGE.IN_YOUR_CART}
					component={lazy(() =>
						import("../Pages/HRTemplates/InYourCart")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "cart",
						},
					}}
					path={constants.ROUTE.HR_TEMPLATE_PAGE.REVIEW_PAYMENT}
					component={lazy(() =>
						import("../Pages/HRTemplates/docShopPayment")
					)}
				/>

				<RestrictedRoute
					exact
					layoutSettings={{
						sidebarSettings: {
							active: "cart",
						},
					}}
					path={constants.ROUTE.HR_TEMPLATE_PAGE.PAYMENT_SUCCESS}
					component={lazy(() =>
						import("../Pages/HRTemplates/docShopSuccess")
					)}
				/>

				{/* add routes above this line */}
				<PublicRoute
					exact
					layoutSettings={{
						isUserRegistration: true,
					}}
					path={constants.ROUTE.USER.USER_PROFILE_HASH}
					component={lazy(() => import("../Pages/User/UserProfile"))}
				/>
			</Switch>
		</Suspense>
	);
}
