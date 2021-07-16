import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
	callAddCountryAPI,
	callgetCountryListAPI,
	callgetFavouriteCountryAPI,
	callgetRegionListAPI,
	callgetSpecificRegionListAPI,
	callgetUserCountryDetails,
} from "../../Actions/CountryAction";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { Link, useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import { getUserProfile, storeCountryData } from "../../utils/storage";
import MySelect from "../../Components/MultiselectDropDown/MySelect";
import { setCountrySelection } from "../../Store/reducers/user";
/* Icons */
import Pin_active from "../../assets/images/Vector-active.svg";
import Pin from "../../assets/images/Vector.svg";
const Country = (props) => {
	const [countryList, setCountryList] = useState([]);
	const [updateCountryList, setUpdateCountryList] = useState([]);
	const [search_Data, searchData] = useState([]);
	const [regionList, setRegionList] = useState([]);
	const [favouriteList, setFavourite] = useState([]);
	const [specificRegionList, setSpecificRegionList] = useState([]);
	const [countryId, setCountryId] = useState("");
	const [searchItem, setSearchItem] = useState("");
	const [userID, setUserId] = useState("");
	const [mapData, setMapData] = useState([]);
	const history = useHistory();
	const [selectedRegion, setSelectedRegion] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		var user_data = getUserProfile();
		setUserId(user_data.userId);
		getUserCountryDetails(user_data.userId);
		getCountryList();
		getRegionList();
		getFavouriteCountryList(user_data.userId);
	}, []);

	const getCountryList = () => {
		props
			.callgetCountryListAPIAction()
			.then((response) => {
				console.log("country List", response);
				searchData(response.data.data);
				setCountryList(response.data.data);
				setUpdateCountryList(response.data.data);
				setCountryId(response.data.data[0].id);
				let FlagData = [];
				response.data.data.forEach((item, index) => {
					console.log("item", item);
					FlagData[item.id] = item;
				});
			})
			.catch((errors) => {});
	};

	const getRegionList = () => {
		props
			.callgetRegionListAPIAction()
			.then((response) => {
				console.log("region List", response);
				setRegionList(response.data.data);
			})
			.catch((errors) => {});
	};

	const handleClick = (id) => {
		console.log("selected id", id);
		setSelectedRegion(id);
		let regionID = [];
		if (id && id.length) {
			regionID =
				id &&
				id.map((contryItem) => {
					return contryItem.id;
				});
		}
		console.log("selected id regionID", regionID);
		props
			.callgetCountryListAPIAction(regionID)
			.then((response) => {
				searchData(response.data.data);
				setCountryList(response.data.data);
				setUpdateCountryList(response.data.data);
				setCountryId(response.data.data[0].id);
			})
			.catch((error) => {
				if (error?.response?.data?.errors) {
					let result = error.response.data
						? error.response.data.errors
							? error.response.data.errors
							: ""
						: "";
					if (result != "") {
						CustomeNotification(
							"error",
							error.response.data.errors,
							"Error",
							2500,
							() => {}
						);
					}
				}
			});
	};

	const getUserCountryDetails = (userID) => {
		props
			.callgetUserCountryDetailsAction(userID)
			.then((response) => {
				console.log("user country", response.data.data);
				let ids = response.data.data.map((item) => {
					return item.id;
				});
				setMapData(ids);
			})
			.catch((errors) => {});
	};

	const handleSubmit = () => {
		console.log("tempData map", mapData);
		let countryId = mapData.toString();
		// if (mapData && mapData.length) {
		props
			.callAddCountryAPIAction({ userid: userID, countryId })
			.then((response) => {
				console.log("add country", response);
				history.push(constants.ROUTE.LOCATION.LOCATION);
				CustomeNotification(
					"success",
					"Country Added to Favourite List",
					"Success",
					2000
				);
				// props.countrySelectionAction(true);
				dispatch(setCountrySelection(true));
				storeCountryData(
					userID,
					countryList.filter((x) => x.isMap)
				);
			})
			.catch((error) => {
				if (error?.response?.data?.errors) {
					let result = error.response.data
						? error.response.data.errors
						: "";
					if (result != "") {
						CustomeNotification(
							"error",
							error.response.data.errors,
							"Error",
							2500,
							() => {}
						);
					}
				}
			});
	};
	const getFavouriteCountryList = (UserID) => {
		props
			.callgetFavouriteCountryAPIAction(UserID)
			.then((response) => {
				console.log(
					"favourite country List",
					response.data.data.employeeCountryCount
				);
				let favouriteData = {};
				response.data.data.employeeCountryCount.forEach((item) => {
					favouriteData[item.countryID] = item;
				});
				console.log("favouriteData action", favouriteData);
				setFavourite(favouriteData);
			})
			.catch((errors) => {});
	};

	const handleSearch = (e) => {
		const searchValue1 = e.target.value;
		const searchValueTrim = searchValue1.trim();
		const searchValue = searchValueTrim.toLowerCase();
		setSearchItem(e.target.value);
		const updateValue = countryList.filter((item) => {
			console.log(
				"updateValue 12121",
				item,
				item.country_Name.toLowerCase().search(searchValue) !== -1
			);
			return item.country_Name.toLowerCase().search(searchValue) !== -1;
		});
		console.log("updateValue", updateValue);
		setUpdateCountryList(updateValue);
	};

	const handleChangeMap = (id) => {
		let tempData = [...mapData];
		if (tempData.includes(id)) {
			tempData.pop(id);
		} else {
			tempData.push(id);
		}
		console.log("tempData", tempData);
		setMapData(tempData);
		let tempData1 = [...updateCountryList];
		let tempData1Contry = [...countryList];
		let index = tempData1.findIndex((item) => item.id === id);
		let indexContry = tempData1.findIndex((item) => item.id === id);
		tempData1Contry[indexContry] = {
			...tempData1Contry[indexContry],
			isMap: tempData1[indexContry].isMap ? false : true,
		};
		tempData1[index] = {
			...tempData1[index],
			isMap: tempData1[index].isMap ? false : true,
		};
		setUpdateCountryList(tempData1);
		setCountryList(tempData1Contry);
	};

	return (
		<div className="container">
			<div className="row justify-content-center mt-3">
				<div className="col-8">
					<div className="row">
						<div className="col-6">
							<Link
								to={constants.ROUTE.USER.USER_PROFILE}
								className="back-btn"
							>
								Previous Step
							</Link>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div className="header-section">
								<h2>
									Select countries your company has operations
									in or is interested in.
								</h2>
								<h4>
									You will see these countries/states on your
									Home Page every time you log in.
								</h4>
							</div>
						</div>
						<div className="row mb-4 mt-4">
							<div className="col-6 p-0">
								<div className="search-wrap">
									<input
										type="text"
										className="form-control"
										placeholder="Search By Country or US state"
										value={searchItem}
										onChange={handleSearch}
									/>
									<a href="#">
										<i className="ph-magnifying-glass" />
									</a>
								</div>
							</div>

							<div className="col-6 p-0">
								<div className="country_dropdown">
									<MySelect
										data={regionList}
										labelKey="region_Name"
										placeholder="Find countries by region"
										valueKey="id"
										value={selectedRegion}
										updateDropdown={handleClick}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-8 mx-auto">
						<>
							<div className="row">
								<div className="country-wrapper col-12 custom-scroll">
									{updateCountryList.map((item, index) => {
										const favouriteCountry =
											favouriteList[item.id];
										console.log(
											"favouriteCountry",
											favouriteCountry
										);
										return (
											<div className="row" key={index}>
												<div 	onClick={() =>
																handleChangeMap(
																	item.id
																)
															} className="country-list cursor-pointer">
													<a>
														<span className="country-list-active">
															{item.country_Name}
														</span>
													</a>
													<div className="flag">
														<img
															src={`${
																constants.API
																	.COUNTRY
																	.GET_FLAG_DOWNLOAD
															}${
																item.flag_Upload_Id
																	? item.flag_Upload_Id
																	: ""
															}`}
														/>
													</div>

													{/* <div className="navigation">
														<div
														
														>
															<div
																// className={`${
																// 	mapData.includes(
																// 		item.id
																// 	)
																// 		? "pin_active"
																// 		: "pin_normal"
																// }`}
															>
																	{mapData.includes(
																item.id
															) ? (
																<img
																	src={
																		Pin_active
																	}
																/>
															) : (
																<img
																	src={Pin}
																/>
															)}
																{favouriteCountry &&
																favouriteCountry.employeeCount >
																	0 ? (
																	<i className="ph-push-pin" />
																) : (
																	<i className="ph-push-pin" />
																)}
															</div>
														</div>
													</div> */}
													<div className="navigation">
														<div
															onClick={() =>
																handleChangeMap(
																	item.id,
																)
															}
														>
															{mapData.includes(
																item.id
															) ? (
																<img
																	src={
																		Pin_active
																	}
																/>
															) : (
																<img
																	src={Pin}
																/>
															)}
															{/* {favouriteCountry &&
																favouriteCountry.employeeCount >
																	0 ? (
																	<i className="ph-push-pin" />
																) : (
																	<i className="ph-push-pin" />
																)} */}
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</>
					</div>
					<div className="col-12">
						<div className="action-wrap">
							<div className="row align-items-center justify-content-between">
								<div>
									<Link
										to={constants.ROUTE.LOCATION.LOCATION}
										className="skipbtn"
									>
										Skip for now
									</Link>
								</div>
								<div>
									<button
										type="button"
										className="btn btn-primary"
										onClick={handleSubmit}
									>
										Next
										<i className="ph-arrow-right" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		timeline: state.timeline,
	};
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			callgetCountryListAPIAction: callgetCountryListAPI,
			callgetRegionListAPIAction: callgetRegionListAPI,
			callgetSpecificRegionListAPIAction: callgetSpecificRegionListAPI,
			callgetFavouriteCountryAPIAction: callgetFavouriteCountryAPI,
			callAddCountryAPIAction: callAddCountryAPI,
			callgetUserCountryDetailsAction: callgetUserCountryDetails,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Country);
