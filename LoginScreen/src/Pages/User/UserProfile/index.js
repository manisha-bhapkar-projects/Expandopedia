import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../../Components/TextFieldComponent/TextFieldComponent";

import {
	callgetUserProfileAPI,
	callUpdateUserProfileAPI,
	callUploadProfilePicAPI,
	callgetIndustryList,
	callgetCompanyList,
	callgetPrimaryUser,
} from "../../../Actions/UserProfileAction";
import {
	callDeleteProfilePic,
  } from "../../../Store/reducers/myAccount";
import { connect, useDispatch,useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
	getKeyClockToken_Data,
	setKeyClockId,
} from "../../../utils/storage/index";
import jwt_decode from "jwt-decode";
import constants from "../../../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { CustomeNotification } from "../../../Components/CustomeNotification/CustomeNotification";
import UserService from "../../../services/UserService";
import { storeUserProfile } from "../../../utils/storage/index";
import CustomeDropDown from "../../../Components/CustomeDropDown/CustomeDropDown";
import { setAboutYou, setUserProfile } from "../../../Store/reducers/user";
import Loader from "../../../Components/Loader";

import questionMark from "../../../assets/images/questionmark.svg";

const UserProfile = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const profilePicError = useSelector((state) => state.myAccountReducer.profilePicError);
    const profilePicDeleted = useSelector((state) => state.myAccountReducer.profilePicDeleted);

	const hiddenFileInput = React.useRef(null);
	const [showErr, setError] = useState("");
	const [isError, setIsError] = useState({});
	const [isFocus, setIsFocus] = useState({});
	const [ImageUrl, setImageURL] = useState("");
	const [kayClock_id, setkayClock_id] = useState("");
	const [isPrimaryUser, setPrimaryUserKey] = useState("");
	const [industryList, setIndustryName] = useState([]);
	const [companyList, setCompanyName] = useState([]);
	const [requestParams, setRequestParams] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);
	const [companyID, setCompanyId] = useState("");
	const [reload, setReload] = useState(false);
	const [loading, setLoader] = useState(true);
	const [roleName,setRoleName]=useState()

	const [initialValues, setInitialValues] = useState({
		firstName: "",
		lastName: "",
		emailId: "",
		jobTitle: "",
		companyName: "",
		filePathUri: "",
		preferredName: "",
		insustryName: "",
	});

	useEffect(() => {
		var token_data = getKeyClockToken_Data();
		var newData = token_data ? jwt_decode(token_data) : "";
		var kayClock_id = newData ? (newData.sub ? newData.sub : "") : "";
		setKeyClockId(kayClock_id);
		setkayClock_id(kayClock_id);
		getIndustryList();
		getCountryList();
	}, []);

	useEffect(() => {
		var token_data = getKeyClockToken_Data();
		if (token_data) {
			getUserDetails(kayClock_id);
		} else {
			UserService.initKeycloak(setReload);
		}
	}, [kayClock_id]);

	// useEffect(() => {
	// 	if (isPrimaryUser === true) {
	// 		history.push(constants.ROUTE.USER.USER_PROFILE);
	// 	}else{
	// 		history.push(constants.ROUTE.HOME_PAGE.HOME);
	// 	}
	// }, [isPrimaryUser]);

	useEffect(() => {
		if (reload) {
			window.location.reload();
		}
	}, [reload]);

	useEffect(() => {
		if (profilePicError && profilePicError.length) {
		  props.notify(profilePicError);
		} else if(profilePicDeleted && profilePicDeleted === 200){
		  props.notify("Profile Image Deleted");
		  setInitialValues({
			...initialValues,
		  });
		  setImageURL("");
		 dispatch(callDeleteProfilePic({ success : true }));
		}
	  }, [profilePicError, profilePicDeleted]);

	const goToHome = (initialValue, isPrimaryUser, r) => {
		// sessionStorage.setItem("showTutorial", true);
		history.push(constants.ROUTE.HOME_PAGE.HOME);
		dispatch(setAboutYou(true));
	};

	const getUserDetails = (kayClock_id) => {
		props
			.callgetUserProfileAPIAction(kayClock_id)
			.then((response) => {
				console.log(
					"response.data.data.userProfile",
					response.data.data.userProfile
				);
				setRequestParams(response.data.data.userProfile);
				const initialVal = {
					...initialValues,
					companyName: response.data.data.company.companyName,
					insustryName: response.data.data.company.industryName,
					emailId: response.data.data.emailId,
					firstName: response.data.data.userProfile.firstName,
					preferredName: response.data.data.userProfile.preferredName,
					lastName: response.data.data.userProfile.lastName,
					jobTitle: response.data.data.userProfile.jobTitle,

				};

				setInitialValues(initialVal);
				setIsAdmin(response.data.data.isAdmin);
				setImageURL(response.data.data.userProfile.imageUrl);

				setCompanyId(response.data.data.companyId);
				setPrimaryUserKey(response.data.data.isPrimaryUser);
				setRoleName(response.data.data.roleName)
				console.log("sssssssssssss",response.data.data.isPrimaryUser)
				if (
					response?.data?.data?.roleName &&
					response?.data?.data?.userProfile
				) {
					let newDataProfile = response.data.data.userProfile;
					newDataProfile.roleName = response.data.data.roleName;
					storeUserProfile(
						response.data.data.userProfile ? newDataProfile : {}
					);
					dispatch(
						setUserProfile(
							response.data.data.userProfile ? newDataProfile : {}
						)
					);
				}
				if (
					initialVal.companyName &&
					initialVal.insustryName &&
					initialVal.emailId &&
					initialVal.firstName &&
					initialVal.preferredName &&
					initialVal.lastName 
				)
					goToHome(
						initialVal,
						response.data.data.isPrimaryUser,
						response.data.data.userProfile
					);
				else setLoader(false);
			})
			.catch((errors) => {});
	};

	const handleChangeValue = (e) => {
		setInitialValues({
			...initialValues,
			[e.target.name]: e.target.value,
		});
		setIsError({ ...isError, [e.target.name]: "" });
	};

	const validate = (values) => {
		let errors = {};
		return errors;
	};

	const handleFocus = (e) => {
		const validation = validate(initialValues);
		setIsError(validation);
		setIsFocus({ ...isFocus, [e.target.name]: true });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validation = validate(initialValues);
		setIsError(validation);
		setRequestParams({
			...requestParams,
			emailId: initialValues.emailId,
			companyName: initialValues.companyName,
			jobTitle: initialValues.jobTitle,
			ImageUrl: ImageUrl,
			firstName: initialValues.firstName,
			lastName: initialValues.lastName,
			preferredName: initialValues.preferredName,
		});
		hanleUpdateProfile(isPrimaryUser);
	};
console.log("primary",isPrimaryUser);
	const hanleUpdateProfile = (isPrimaryUser) => {
		props
			.callUpdateUserProfileAPIAction(requestParams.id, {
				...requestParams,
				...initialValues,
			})
			.then((res) => {
				let newDataProfile = res.data.data.userProfile;
				newDataProfile.roleName = res.data.data.roleName;
				storeUserProfile(
					res.data.data.userProfile ? newDataProfile : {}
				);
				if ((roleName==="expandopedia_admin"||roleName === "CompanyAdmin")&&isPrimaryUser === true) {
					history.push(constants.ROUTE.COUNTRY.COUNTRY);
					props.notify("Profile Updated Successfully", 5000);
				} else {
					sessionStorage.setItem("showTutorial", true);
					history.push(constants.ROUTE.HOME_PAGE.HOME);
					dispatch(setAboutYou(true));
				}
				dispatch(setAboutYou(true));
			})
			.catch((error) => {
				if (error?.response?.data?.errors) {
					const m = error.response.data.errors;
					const message = m.join(",");
					props.notify(message, 5000);
				}
			});
	};

	const handleChange = (event) => {
		const data = new FormData();
		data.append("file", event.target.files[0]);
		props
			.callUploadProfilePicAPIAction(data)
			.then((response) => {
				setImageURL(response.data.data.id);
				setInitialValues({
					...initialValues,
					imageUrl: response.data.data.id,
				});
				props.notify(response.data.message, 5000);
			})
			.catch((errors) => {
				props.notify("Error! Failed to upload", 4000);
			});
	};
	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	const getIndustryList = () => {
		props
			.callgetIndustryListAction()
			.then((res) => {
				setIndustryName(
					res.data.data && res.data.data.length
						? res.data.data.map((x) => {
								return {
									...x,
									id: x.id,
									value: x.industryName,
								};
						  })
						: []
				);
			})
			.catch((error) => {});
	};
	const getCountryList = () => {
		props
			.callgetCompanyListAction()
			.then((res) => {
				setCompanyName(
					res.data.data.data && res.data.data.data.length
						? res.data.data.data.map((x) => {
								return {
									...x,
									id: x.id,
									value: x.companyName,
								};
						  })
						: []
				);
			})
			.catch((error) => {});
	};

	const updateIndustryDropdown = (id) => {
		let value = industryList.filter((x) => x.id == id);
		setInitialValues({
			...initialValues,
			insustryName: value[0].value,
		});
	};

	const updateCompanyDropdown = (id) => {
		let value = companyList.filter((x) => x.id == id);
		setInitialValues({
			...initialValues,
			companyName: value[0].value,
		});
	};
	const deleteProfilePic = async () => {
		let image = ImageUrl;
		console.log("simagee",image)
		await dispatch(callDeleteProfilePic({ image }));
	  };

	  
	
	if (loading)
		return (
			<div className="white-overlay">
				<div className="msg-wrapper-loader">
					<Loader />
				</div>
			</div>
		);
	else
		return UserService.initKeycloak ? (
			UserService.isLoggedIn ? (
				<>
					<div className="container">
						<div className="row justify-content-center mt-3">
							<div className="col-8">
								<div className="col-12">
									<div className="row">
										<div className="header-section">
											<h2 className="welcome-name">
												Welcome,{" "}
												{initialValues.firstName
													? initialValues.firstName
													: "Guest"}
												!{" "}
											</h2>
											<h2>
												You’re steps away from getting
												started. Let’s begin!
											</h2>
										</div>
									</div>
									<div className="row">
										<div className="form">
											<div className="row">
												<div className="col-4">
													<div className="floating">
														<TextFieldComponent
															id="firstName"
															label="First name*"
															data-test="firstName"
															dataContent="First name*"
															type="text"
															placeholder="First name*"
															name="firstName"
															value={
																initialValues.firstName
															}
															onBlur={handleFocus}
															onChange={
																handleChangeValue
															}
														/>
													</div>
												</div>
												<div className="col-4">
													<div className="floating">
														<TextFieldComponent
															id="lastName"
															label="Last Name*"
															data-test="lastName"
															dataContent="Last Name*"
															type="text"
															placeholder="Last Name*"
															name="lastName"
															value={
																initialValues.lastName
															}
															onBlur={handleFocus}
															onChange={
																handleChangeValue
															}
														/>
													</div>
												</div>
												<div className="col-4">
													<div className="floating">
														<TextFieldComponent
															id="preferredName"
															label="Preferred Name*"
															data-test="preferredName*"
															dataContent="Preferred Name*"
															type="text"
															placeholder="Preferred Name*"
															name="preferredName"
															value={
																initialValues.preferredName
															}
															onBlur={handleFocus}
															onChange={
																handleChangeValue
															}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="col-12 px-0">
											<div className="row">
												<div className="col-6">
													<div className="floating">
														<TextFieldComponent
															id="input__password"
															label="Email Address*"
															data-test="input__password"
															dataContent="Email Address*"
															type="email"
															name="emailId"
															placeholder="Email Address*"
															value={
																initialValues.emailId
															}
															onBlur={handleFocus}
															onChange={
																handleChangeValue
															}
														/>
													</div>
												</div>
												<div className="col-6">
													<div className="floating">
														<TextFieldComponent
															id="Job_Title"
															label="Job Title"
															data-test="Job_Title"
															dataContent="Job Title"
															type="text"
															name="jobTitle"
															placeholder="Job Title"
															value={
																initialValues.jobTitle
															}
															onBlur={handleFocus}
															onChange={
																handleChangeValue
															}
														/>
													</div>
												</div>
											</div>
											<div className="col-12 px-0">
												<div className="row">
													<div className="col-6">
														<div className="floating position-relative">
															<CustomeDropDown
																className="form-control ld_form-ctrl custome-dropdown"
																data={
																	companyList
																}
																placeholder="Company Name*"
																value={
																	initialValues.companyName
																}
																onSelect={
																	updateCompanyDropdown
																}
															/>
															<span className="dropdown_btn_label">
																Company Name*
															</span>
														</div>
													</div>
													<div className="col-6">
														<div className="floating">
															<CustomeDropDown
																className="form-control ld_form-ctrl custome-dropdown"
																data={
																	industryList
																}
																placeholder="Industry*"
																value={
																	initialValues.insustryName
																}
																onSelect={
																	updateIndustryDropdown
																}
															/>
															<span className="dropdown_btn_label">
																Industry*
															</span>
														</div>
													</div>
												</div>
											</div>

											<div className="role-assigned">
												You are assigned the role of{" "}
												<a href="">Account Owner.</a>{" "}
												<img src={questionMark} />
											</div>

											<div>
												<div className="floating">
													<div className="profile-info">
														<div className="profile-picture">
															{ImageUrl ? (
																<img
																	src={
																		ImageUrl
																			? `${constants.API.COUNTRY.GET_FLAG_DOWNLOAD}${ImageUrl} `
																			: ""
																	}
																	className="profile-picture"
																/>
															) : (
																""
															)}
															<input
																type="file"
																style={{
																	display:
																		"none",
																}}
																ref={
																	hiddenFileInput
																}
																accept=".png, .jpg, .jpeg, .gif, .svg"
																onChange={
																	handleChange
																}
															/>
															<a 
								                          onClick={ImageUrl ? deleteProfilePic : handleClick}
															className="registration-img-txt">
															{ImageUrl ? "Remove" : "Upload Image"}	
															</a>
														</div>
														<a
															href="#"
															type="button"
															className={ImageUrl ? "btn btn-secondary btn-upload ml-5" : "disabled btn btn-secondary btn-upload-grey ml-5"}
															onClick={
																handleClick
															}
														>
															Change
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-8">
								<div className="action-wrap col-12">
									<div className="row align-items-center justify-content-end">
										{/* <div data-test="skip_link">
											{isPrimaryUser && isPrimaryUser ? (
												<Link
													to={
														constants.ROUTE.COUNTRY
															.COUNTRY
													}
												>
													Skip for now
												</Link>
											) : (
												<div className="skip-now-link">
													Skip for now
												</div>
											)}
										</div> */}
										
										{ (roleName==="expandopedia_admin"||roleName === "CompanyAdmin")&&isPrimaryUser ? (
											<div>
												<a
													href="#"
													type="button"
													onClick={handleSubmit}
													className="btn btn-primary mt-0 login-btn "
												>
													Next
													<i className="ph-arrow-right" />
												</a>
											</div>
										) : (
											<div>
												<a
													href="#"
													type="button"
													onClick={handleSubmit}
													className="btn btn-primary mt-0 login-btn"
												>
													Finish
													<i className="ph-arrow-right" />
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				""
			)
		) : (
			""
		);
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			callgetUserProfileAPIAction: callgetUserProfileAPI,
			callUpdateUserProfileAPIAction: callUpdateUserProfileAPI,
			callUploadProfilePicAPIAction: callUploadProfilePicAPI,
			callgetIndustryListAction: callgetIndustryList,
			callgetCompanyListAction: callgetCompanyList,
			callgetPrimaryUserAction: callgetPrimaryUser,
		},
		dispatch
	);

export default connect(null, mapDispatchToProps)(UserProfile);
