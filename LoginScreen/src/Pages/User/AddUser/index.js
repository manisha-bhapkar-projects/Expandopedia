import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import constants from "../../../utils/constants";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
	callAddCoworkers,
	callDeleteUserAPI,
	callgetCoworkersList,
	callgetUserByKeyClockId,
} from "../../../Actions/AddUserAction";
import { CustomeNotification } from "../../../Components/CustomeNotification/CustomeNotification";
import {
	getKeyClockToken_Data,
	storeKeyClockUserId,
} from "../../../utils/storage/index";
import jwt_decode from "jwt-decode";
import TextFieldComponent from "../../../Components/TextFieldComponent/TextFieldComponent";
import { callgetPrimaryUser } from "../../../Actions/UserProfileAction";
import { setAddUser } from "../../../Store/reducers/user";
const AddUser = (props) => {
	const history = useHistory();
	const [loggedInUserId, setloggedInUserId] = useState("");
	const [companyID, setCompanyID] = useState("");
	const [id, setID] = useState("");
	const [coWorkerEmail, setcoWorkerEmail] = useState([]);
	const [coWorkerLength, setcoWorkerLength] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const [isCheckedDoc, setIsCheckedDoc] = useState(false);
	const [isError, setIsError] = useState({});
	const [isFocus, setIsFocus] = useState({});
	const [initialValues, setInitialValues] = useState({
		FirstName: "",
		emailid: "",
		LastName: "",
	});

	const dispatch = useDispatch();

	useEffect(() => {
		var token_data = getKeyClockToken_Data();
		var newData = token_data ? jwt_decode(token_data) : "";
		var id = newData ? (newData.sub ? newData.sub : "") : "";
		setID(id);
		getUserByKeyClock(id);
	}, []);
	useEffect(() => {
		if (loggedInUserId) {
			getCoworkers(loggedInUserId);
		}
	}, []);

	const request = {
		createdby: loggedInUserId,
		FirstName: initialValues.FirstName,
		LastName: initialValues.LastName,
		emailid: initialValues.emailid,
		AdminPrivilege: isChecked ? true : false,
		AccessPermission: isCheckedDoc ? true : false,
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

	const getUserByKeyClock = (id) => {
		props
			.callgetUserByKeyClockIdAPIAction(id)
			.then((res) => {
				setloggedInUserId(res.data.data.id);
				storeKeyClockUserId(res.data.data.id);
				getCoworkers(res.data.data.id);
				setCompanyID(res.data.data.companyId);
			})
			.catch((error) => {});
	};

	const getCoworkers = (loggedInUserId) => {
		props
			.callgetCoworkersListAPIActon(loggedInUserId)
			.then((res) => {
				setcoWorkerEmail(res.data.data);
				console.log("response", res.data.data);
				console.log("response length", res.data.data.length);
				setcoWorkerLength(res.data.data.length);
			})
			.catch((error) => {});
	};

	const handleSubmit = () => {
		getPrimaryUser(companyID);
		sessionStorage.setItem("showTutorial", true);
		history.push(constants.ROUTE.HOME_PAGE.HOME);
		dispatch(setAddUser(true));
	};

	const handleAdd = (e) => {
		e.preventDefault();
		props
			.callPostAddCoworkerAPIAction(request)
			.then((res) => {
				console.log(res);
				props.notify("User Added Successfully", 5000);
				getCoworkers(loggedInUserId);
				initialValues.FirstName = "";
				initialValues.LastName = "";
				initialValues.emailid = "";
				setIsCheckedDoc(false);
				setIsChecked(false);
			})
			.catch((error) => {
				if (error.response.data.errors) {
					const m = error.response.data.errors;
					const message = m.join(",");
					props.notify(message, 5000);
				}
			});
	};
	const handleOnChange = (e) => {
		setIsChecked(!isChecked);
	};
	const handleOnChangeDoc = (e) => {
		setIsCheckedDoc(!isCheckedDoc);
	};
	const deleteUser = (e, item, index) => {
		props
			.callDeleteUserAPIAction(item.id)
			.then((res) => {
				props.notify("User Deleted Successfully", 5000);
				getCoworkers(loggedInUserId);
			})
			.catch((error) => {
				props.notify(error.response.data.errors, 5000);
			});
	};

	const getPrimaryUser = (companyID) => {
		props
			.callgetPrimaryUserAction(companyID)
			.then((res) => {})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleClickSkip = () => {
		sessionStorage.setItem("showTutorial", true);
		history.push(constants.ROUTE.HOME_PAGE.HOME);
	};
	return (
		<div className="container">
			<div className="row justify-content-center mt-3">
				<div className="col-8">
					<div className="row">
						<div className="col-6">
							<Link
								to={constants.ROUTE.LOCATION.LOCATION}
								className="back-btn"
							>
								Previous Step
							</Link>
						</div>
					</div>
					<div className="col-12">
						<div className="row mb-5">
							<div className="header-section">
								<h2>Add Users</h2>
								<h4>
									Your account has four licenses. Invite upto
									four coworkers to explore Expandopedia with
									you!
								</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-12 px-0">
								<form>
									<div className="col-12 px-0">
										<div className="row">
											<div className="col-6">
												<div className="form-group">
													<TextFieldComponent
														type="text"
														id="FirstName"
														name="FirstName"
														value={
															initialValues.FirstName
														}
														onChange={
															handleChangeValue
														}
														placeholder="First Name*"
														label="First Name*"
														dataContent="First Name*"
													/>
												</div>
											</div>
											<div className="col-6">
												<div className="form-group">
													<TextFieldComponent
														type="text"
														id="LastName"
														name="LastName"
														value={
															initialValues.LastName
														}
														onChange={
															handleChangeValue
														}
														placeholder="Last Name*"
														label="Last Name*"
														dataContent="Last Name*"
													/>
												</div>
											</div>
										</div>
										<div className="form-group mt-4">
											<TextFieldComponent
												type="email"
												id="emailid"
												name="emailid"
												value={initialValues.emailid}
												onChange={handleChangeValue}
												placeholder="Email Id*"
												label="Email Id*"
												dataContent="Email Id*"
												onBlur={handleFocus}
												// error={isError.emailid && isFocus.emailid ? true : false}
												// helperText={isError.emailid}
											/>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="admin"
												name="admin"
												value="1"
												checked={isChecked}
												onChange={handleOnChange}
											/>
											<label
												className="form-check-label mr-3"
												htmlFor="defaultCheck1"
											>
												User has admin privileges
											</label>
											<a
												href
												className="info-wrap-tooltip"
											>
												<i className="ph-question"></i>
												<div className="info-content">
													<h4>What’s this?</h4>
													<p>
														Admin users can add and
														manage other users.
													</p>
												</div>
											</a>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="Document"
												name="Document"
												checked={isCheckedDoc}
												onChange={handleOnChangeDoc}
											/>
											<label
												className="form-check-label mr-3"
												htmlFor="defaultCheck1"
											>
												User has access to purchased and
												downloaded documents.
											</label>
										</div>
									</div>
								</form>
								<div className="action-wrap">
									<div className="row">
										<div className="col d-flex justify-content-end">
											<button
												type="button"
												className={`btn btn-secondary add-btn user-add-btn`}
												onClick={handleAdd}
												disabled={`${
													coWorkerLength >= 4
														? "disabled"
														: ""
												}`}
											>
												Add
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row d-block">
							<h3 className="user-header">Users added</h3>
							<div className="user-list">
								{coWorkerEmail == "" ? (
									<span>
										Add users to see their email address
										listed here.
									</span>
								) : (
									""
								)}

								{coWorkerEmail
									? coWorkerEmail.map((item, index) => {
											return (
												<a
													key={index}
													href
													className="odd"
												>
													{item.emailId}
													<i
														className="ph-x cursor-pointer"
														onClick={(e) =>
															deleteUser(
																e,
																item,
																index
															)
														}
													/>
												</a>
											);
									  })
									: ""}
								{coWorkerLength >= 4 ? (
									<div className="error-text">
										<h5>
											We were unable to invite some more
											users.
										</h5>
										<h6>
											Try changing the email address or
											remove user to proceed.{" "}
										</h6>
									</div>
								) : (
									""
								)}
							</div>
						</div>
						<div className="action-wrap">
							<div className="row">
								<div className="col pl-0">
									<a
										href="#"
										// to={constants.ROUTE.SUCCESS.SUCCESS}
										onClick={handleClickSkip}
										className="skipbtn"
									>
										Skip for now
									</a>
								</div>
								<div className="col d-flex justify-content-end pr-0">
									<button
										type="button"
										className="btn btn-primary"
										onClick={handleSubmit}
									>
										Finish
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
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			callPostAddCoworkerAPIAction: callAddCoworkers,
			callgetCoworkersListAPIActon: callgetCoworkersList,
			callgetUserByKeyClockIdAPIAction: callgetUserByKeyClockId,
			callDeleteUserAPIAction: callDeleteUserAPI,
			callgetPrimaryUserAction: callgetPrimaryUser,
		},
		dispatch
	);
export default connect(null, mapDispatchToProps)(AddUser);
