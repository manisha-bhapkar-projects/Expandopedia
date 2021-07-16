import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

/* Component */
import SearchHeaderText from "../../../Components/SearchHeaderText/SearchHeaderText";
import MySelect from "../../../Components/MultiselectDropDown/MySelect";
import SupportButton from "../../../Components/SupportButton";
import constants from "../../../utils/constants";

/* Icons */
import Pin_active from "../../../assets/images/Vector-active.svg";
import Pin from "../../../assets/images/Vector.svg";

/* Action */
import {
	callAddCountryAPI,
	callgetCountryListAPI,
	callgetRegionListAPI,
	callgetSpecificRegionListAPI,
} from "../../../Store/reducers/favoriteCountries";

const AddCountry = (props) => {
	const history = useHistory();
	const [selectedRegion, setSelectedRegion] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [regionID, setRegionIds] = useState("");
	const [countryListData, setCountryList] = useState([]);
	const [updateCountryList, setUpdateCountryList] = useState([]);
	const [search_Data, searchData] = useState([]);
	const [mapData, setMapData] = useState([]);
	const [searchCountry,setSearchCountry]=useState([])

	const dispatch = useDispatch();
	const countryList = useSelector(
		(state) => state.favoriteCountriesReducer.countryList
	);
	const regionList = useSelector(
		(state) => state.favoriteCountriesReducer.regionList
	);
	const specificRegionList = useSelector(
		(state) => state.favoriteCountriesReducer.specificRegionList
	);
	const UserCountryData = useSelector(
		(state) => state.favoriteCountriesReducer.UserCountryData
	);
	var ids= UserCountryData && UserCountryData.map((item) => {
		return item.id;
	});
	const userId = useSelector((state) => state?.user?.userProfile?.userId);
	const countryError = useSelector(
		(state) => state?.favoriteCountriesReducer?.countryError
	);
	const countryAdded = useSelector(
		(state) => state.favoriteCountriesReducer.countryAdded
	);
	const loading = useSelector(
		(state) => state.favoriteCountriesReducer.loading
	);

	useEffect(() => {
		dispatch(callgetCountryListAPI());
		dispatch(callgetRegionListAPI());
		setMapData(ids)
	}, []);
	useEffect(()=>{
		console.log("map",ids);
	},[ UserCountryData])
	useEffect(() => {
		if (countryList && countryList.length) {
			searchData(countryList);
			setCountryList(countryList);
			setUpdateCountryList(countryList);
			setSearchCountry(countryList)
		}
	}, [countryList]);

	useEffect(() => {
		if (regionID && regionID.length) {
			dispatch(callgetSpecificRegionListAPI({ regionID }));
		} else {
			dispatch(callgetCountryListAPI());
		}
	}, [regionID]);

	useEffect(() => {
		if (specificRegionList && specificRegionList.length) {
			searchData(specificRegionList);
			setCountryList(specificRegionList);
			setUpdateCountryList(specificRegionList);
			setSearchCountry(specificRegionList)
		}
	}, [specificRegionList]);

	useEffect(() => {
		if (countryError && countryError.length) {
			props.notify(countryError);
		} else if (countryAdded && countryAdded === 200) {
			props.notify("Country Added to Favorites");
			history.push(constants.ROUTE.SIDEBAR.SETTINGS.FAVORITE_COUNTRIES);
			dispatch(callAddCountryAPI({ success: true }));
		}
	}, [countryError, countryAdded]);

	const handleClick = (id) => {
		console.log("specific",specificRegionList);

		setSelectedRegion(id);
		let region_ID = [];
		if (id && id.length) {
			region_ID =
				id &&
				id.map((countryItem) => {
					return countryItem.id;
				});
		}
		setRegionIds(region_ID);
	};

	const handleSearch = (e) => {
		setSearchItem(e.target.value);
		const updateValue =searchCountry.filter((item) => {
			return (
				item.country_Name
					.toLowerCase()
					.search(e.target.value.trim().toLowerCase()) !== -1
			);
		});
		setUpdateCountryList(updateValue);
	};

	const handleChangeMap = (id, item) => {
		let tempData = [...mapData];
		console.log("temp",id);
		if (tempData.includes(id)) {
			const index = tempData.indexOf(id);
			tempData.splice(index,1);}
		else {
			tempData.push(id);
			
		}
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
		console.log("temp",tempData1Contry)
		setUpdateCountryList(tempData1);
		setCountryList(tempData1Contry);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let countryId = mapData.toString();
		let data = { userId, countryId };
		dispatch(callAddCountryAPI({ data }));
	};
	console.log("map",mapData);
	console.log("specific",specificRegionList);
	console.log("update",countryList);
	return (
		<div data-test="add-country">
			<div>
				<SearchHeaderText
					breadcrumb={true}
					addCountry={true}
					titleHeader={true}
					pageTitle="Add Country"
					onClick={handleSubmit}
				/>
			</div>
			<div className="justify-content-center mt-3">
				<div className="col-12">
					<div className="header-section fav-header">
						<h2>
							Select countries your company has operations in or
							is interested in.
						</h2>
						<h4>
							You will see these countries/states on your Home
							Page every time you log in.
						</h4>
					</div>
					<div className="fav-add-container">
						<div className="row mb-4">
							<div className="col-6 pl-0">
								<div className="search-wrap">
									<input
										type="text"
										className="form-control"
										placeholder="Search By Country/US state"
										value={searchItem}
										onChange={handleSearch}
									/>
									<span>
										<i className="ph-magnifying-glass" />
									</span>
								</div>
							</div>

							<div className="col-6 pr-0">
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

						<>
							{loading ? (
								<div className="text-center">
									<span>Loading...</span>
								</div>
							) : (
								<div className="country-wrapper contry-page-fit col-12">
									{updateCountryList.map((item, index) => {
										return (
											<div className="row">
												<div className="country-list cursor-pointer">
													<div
														onClick={() =>
															handleChangeMap(
																item.id,
																item
															)
														}
													>
														<span>
															<span className="country-list-active pointer">
																{
																	item.country_Name
																}
															</span>
														</span>
														<div className="flag">
															<img
																src={`${
																	constants
																		.API
																		.COUNTRY
																		.GET_FLAG_DOWNLOAD
																}${
																	item.flag_Upload_Id
																		? item.flag_Upload_Id
																		: ""
																}`}
															/>
														</div>
													</div>

													<div className="navigation">
														<div
															onClick={() =>
																handleChangeMap(
																	item.id,
																	item
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
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</>
					</div>
				</div>
			</div>
		<SupportButton/>
		</div>
	);
};

export default AddCountry;
