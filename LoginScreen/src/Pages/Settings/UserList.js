import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";

/* Icons */
import userActiveIcon from "../../assets/images/user-active.svg";
import userDeActiveIcon from "../../assets/images/user-inactive.svg";
import userEditIcon from "../../assets/images/user-edit.svg";
import userPendingIcon from "../../assets/images/user-pending.svg";
import emailIcon from "../../assets/images/email-line.svg";
import deleteIcon from "../../assets/images/delete-outlined.svg";
import downloadIcon from "../../assets/images/download.png";
import dotIcon from "../../assets/images/dotIcon.svg";

/* Component */
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import FilterDropDwon from "../../Components/MultiselectDropDown/FilterDropdown";
import OpenModal from "./OpenModal";
import SearchHeaderText from "../../Components/SearchHeaderText/SearchHeaderText";
import CustomeTable from "../../Components/CustomeTable/CustomeTable";
import SupportButton from "../../Components/SupportButton"
import { ExportCSV } from "../CountryCompare/ExportCSV"
/* Action */
import {
	callChangeUserStatusAPI,
	callgetAdministratorRole,
	callgetUserList,
	callsendEmailToActiateUser,
} from "../../Store/reducers/superAdminUser";
import { getUserProfile } from "../../utils/storage";
import constants from "../../utils/constants";

const UserList = (props) => {
	document.title = "Settings";
	const [selectedRole, setSelectedRole] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [userName, setUserName] = useState();
	const [userId, setUserId] = useState();
	const [userData, setUserData] = useState();
	const [editFlag, setEditFlag] = useState(false);
	const [statusFlag, setStatusFlag] = useState();
	const [userStatus, setUserStatus] = useState();
	const [pageNumber, setPageNumber] = useState(1);
	const [sortField, setSortField] = useState("updateddate");
	const [sortOrder, setSortOrder] = useState(true);
	const [id, setId] = useState("");
	const history = useHistory();
	const [exportUserData, setExportUserData] = useState({
		userExportData: [],
		fileName: "Users",
	  });
	const dispatch = useDispatch();
	const userList = useSelector(
		(state) => state.superAdminUserReducer.userList
	);
	const pageSize = userList.pageSize || 10;
	const totalCount = userList.totalCount;
	const userRoles = useSelector(
		(state) => state.superAdminUserReducer.administratorRole
	);
	const loading = useSelector(
		(state) => state.superAdminUserReducer.userListLoading
	);

	const [userLIstRequestObject, setUserLIstRequestObject] = useState({
		pageNumber: pageNumber,
		pageSize: pageSize,
		sortField,
		sortOrder,
	});
	useEffect(() => {
		var user_data = getUserProfile();
		setUserData(user_data);
		dispatch(callgetAdministratorRole());
	}, []);

	useEffect(() => {
		setPageNumber(1);
		const requestObject = {
			...userLIstRequestObject,
			pageNumber: 1,
			pageSize: pageSize,
			sortField,
			sortOrder,
		};
		setUserLIstRequestObject(requestObject);
		dispatch(callgetUserList(requestObject));
	}, [sortField, sortOrder]);
useEffect(()=>{
	allDataforExport(userList.data);
},[userList])
	const handleSort = (field, order) => {
		setSortField(field?.sortName);
		setSortOrder(order === "asc" ? false : true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleDotClick = (statusId) => {
		if (id && id == statusId) {
			setId(undefined);
		} else {
			setId(statusId);
		}
	};

	const handlePageChange = (perPage) => {
		setPageNumber(perPage);
		const requestObject = {
			...userLIstRequestObject,
			pageNumber: perPage,
			pageSize: pageSize,
		};
		setUserLIstRequestObject(requestObject);
		dispatch(callgetUserList(requestObject));
	};
	const handleDropdownChange = (e) => {
		const requestObject = {
			...userLIstRequestObject,
			pageNumber: 1,
			pageSize: e.target.value,
		};
		setUserLIstRequestObject(requestObject);
		dispatch(callgetUserList(requestObject));
	};
	const handleStatusChanged = async (id, item) => {
		setShowModal(true);
		let user = item?.userProfile
			? item.userProfile.firstName
				? item.userProfile.lastName
					? item.userProfile.firstName +
					" " +
					item.userProfile.lastName
					: ""
				: ""
			: "";
		setUserName(user);
		setUserId(id);
		setUserStatus(item?.userProfile.isActive);
		setStatusFlag(false);
	};

	const openEditModal = (id, item) => {
		setShowModal(true);
		setUserId(id);
		let user = item?.userProfile
			? item.userProfile.firstName
				? item.userProfile.lastName
					? item.userProfile.firstName +
					"" +
					item.userProfile.lastName
					: ""
				: ""
			: "";
		setUserName(user);
		setEditFlag(true);
	};

	const deactivateUser = async (id) => {
		dispatch(
			callChangeUserStatusAPI({
				id: id,
				statusFlag: statusFlag,
				userLIstRequestObject,
			})
		);
		setShowModal(false);
	};

	const goToEditPage = (id) => {
		history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.EDIT_USER}${id}`);
	};

	const sendEmailActivation = async (emailId, activationCode) => {
		dispatch(
			callsendEmailToActiateUser({
				EmailId: emailId,
				ActivationCode: activationCode,
			}),
			CustomeNotification(
				"success",
				"Activation Email Send Successfully",
				"Success",
				2000
			)
		);
	};

	const handleClickSelect = async (userRole, e) => {
		let array = selectedRole.slice(0);
		if (e.target.checked) {
			setSelectedRole([...array, userRole.id]);
			array = [...array, userRole.id];
		} else {
			let index = array.findIndex((item) => item === userRole.id);
			setSelectedRole(array.splice(index, 1));
		}

		const requestObject = {
			...userLIstRequestObject,
			pageNumber: pageNumber,
			pageSize: pageSize,
			roleId: array.join(","),
		};
		setUserLIstRequestObject(requestObject);
		dispatch(callgetUserList(requestObject));
	};

	const handleClick = () => {
		history.push(constants.ROUTE.SIDEBAR.SETTINGS.ADD_USER);
	};

	const allDataforExport = (userData) => {
	
console.log("userData",userData);
		let data = [];
		userData&&userData.forEach((user)=>{
			data.push({
				Status:user.userProfile?.isActive?user.userProfile?.isActive:"No Data",
				First_Name:user.userProfile?.firstName?user.userProfile?.firstName:"No Data",
				Last_Name:user.userProfile?.lastName?user.userProfile?.lastName:"no-data",
				Preferred_Name:user.userProfile?.preferredName?user.userProfile?.preferredName:"No Data",
				Company:user.company?.companyName?user.company?.companyName:"No Data",
				Industry:user.company?.industryName?user.company?.industryName:"No Data",
				Job_Title:user.userProfile?.jobTitle?user.userProfile?.jobTitle:"No Data",
				Role:user.roleName?user.roleName:"No Data",
				Subscription:"No Data",
				Count_of_Licenses:"No Data",
				First_Login_Date:user.createdAt?moment(user.createdAt).format("MMM DD, YYYY"):"No Data",
				Last_Login_Date:user.lastLogin?moment(user.lastLogin).format("MMM DD, YYYY"):"No Data",
				Expiration_Date:"No Data",
				Expert_Hours_Available:"No Data",
				Expert_Hours_Used:"No Data",
				Number_of_Countries_Favorited :"No Data"
			})
		})

		console.log("excel",data)
		setExportUserData({ ...exportUserData, userExportData: data });
	}


console.log("user",exportUserData)
	const UserColumns = [
		{
			name: "Status",
			selector: "userProfile.isActive",
			width: "10%",
			sortable: false,
			cell: (row) => {
				return (
					<>
						<Tooltip
							title={
								row.userProfile && row.userProfile.isActive
									? !row?.keyCloakUserId
										? "Pending"
										: "Active"
									: "Inactive"
							}
						>
							{row?.userProfile && row?.userProfile.isActive ? (
								!row?.keyCloakUserId ? (
									<img src={userPendingIcon} />
								) : (
									<img src={userActiveIcon} />
								)
							) : (
								<img src={userDeActiveIcon} />
							)}
						</Tooltip>
					</>
				);
			},
		},
		{
			name: "Name",
			selector: "name",
			sortable: true,
			sortName: "name",
			width: "20%",
			cell: (row) => (
				<div data-tag="allowRowEvents">
					<div>
						<p className="font-family-for-list mb-2">
							{row.userProfile &&
								row.userProfile.firstName &&
								row.userProfile.lastName
								? row.userProfile.firstName +
								" " +
								row.userProfile.lastName
								: ""}
						</p>
					</div>
					<span className="font-family-list-sub">{row.emailId}</span>
				</div>
			),
		},
		{
			name: "Company",
			selector: "company.companyName",
			width: "20%",
			sortable: true,
			sortName: "company",
			cell: (row) => (
				<>
					<div data-tag="allowRowEvents">
						<div>
							<p className="font-family-for-list mb-2">
								{row.company
									? row.company.companyName
										? row.company.companyName
										: ""
									: ""}
							</p>
						</div>
						<span
							style={{
								color: "slategray",
								fontSize: "14px",
								fontFamily: "webfontregular",
								margin: "0px",
							}}
						>
							{row.company
								? row.company.industryName
									? row.company.industryName
									: ""
								: ""}
						</span>
					</div>
				</>
			),
		},
		{
			name: "Role",
			selector: "roleName",
			right: false,
			sortable: true,
			width: "20%",
			sortName: "role",
			cell: (row) => {
				return (
					<p className="font-family-for-list mb-2">{row.roleName}</p>
				);
			},
		},

		{
			name: "Last Login",
			selector: "lastLogin",
			width: "20%",
			sortable: true,
			right: false,
			sortName: "lastlogin",
			cell: (row) => {
				let title =
					row.userProfile && row.userProfile.isActive
						? !row?.keyCloakUserId
							? "Pending"
							: "Active"
						: "Inactive";
				if (row.lastLogin)
					return (
						<>
							{title === "Pending" ||
								title === "Inactive" ? null : (
								<div data-tag="allowRowEvents">
									<div className="font-family-for-list mb-2">
										{moment(row.lastLogin).format(
											"MMM DD, YYYY"
										)}
									</div>
									<span
										style={{
											color: "slategray",
											fontSize: "14px",
											fontFamily: "webfontregular",
											margin: "0px",
										}}
									>
										{moment(row.lastLogin).format(
											"HH:mm a"
										)}
									</span>
								</div>
							)}
						</>
					);
			},
		},
		{
			name: "",
			selector: "",
			right: false,
			width: "10%",
			grow: "1",
			cell: (row) => {
				return (
					<>
						<div className=" text-end">
							<div
								className="position-relative"
								onClick={() => handleDotClick(row.id, row)}
							>
								<span className="btn-round">
									<img src={dotIcon} />
								</span>

								{id == row.id ? (
									<div className="quick-action-btn">
										<Tooltip title={"Edit User"}>
											{row.userProfile.isActive ==
												false ? (
												<div
													onClick={() =>
														openEditModal(
															row.id,
															row
														)
													}
												>
													<img src={userEditIcon} />
												</div>
											) : (
												<div
													onClick={() =>
														goToEditPage(row.id)
													}
												>
													<img src={userEditIcon} />
												</div>
											)}
										</Tooltip>

										<div>
											<Tooltip title={"Send Email"}>
												<img
													src={emailIcon}
													onClick={() =>
														sendEmailActivation(
															row.emailId,
															row.activationCode
														)
													}
												/>
											</Tooltip>
										</div>
										<div>
											<Tooltip
												title={
													row.userProfile.isActive ==
														false
														? "Not Allowed"
														: "Deactivate User"
												}
											>
												{row.userProfile.isActive ==
													false ? (
													<img
														src={deleteIcon}
														style={{
															cursor: "not-allowed",
															color: "red",
														}}
													/>
												) : (
													<img
														src={deleteIcon}
														onClick={() =>
															handleStatusChanged(
																row.id,
																row
															)
														}
													/>
												)}
											</Tooltip>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</>
				);
			},
		},
	];
	return (
		<div className="" data-test="userList-page">
			<SearchHeaderText
				filter={true}
				breadcrumb={true}
				user={userData}
				userlistBreadcrumb={true}
			/>
			<div className="container-fluid">
				<div className="col-12">
					<div className="title-action-wrap">
						<div className="row">
							<div className="col-sm-6 pl-0">
								<h3
									className="gutter-manag-user"
									data-tip="Manage user"
								>
									Manage Users
								</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6 col-12 pl-0">
								<div className="tbl-search">
									<input
										type="text"
										className="form-control"
										placeholder="Search Users"
									/>
									<div className="download_btn">
									<ExportCSV
									csvData={exportUserData.userExportData}
           							fileName={exportUserData.fileName}
								  />
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-12 d-flex align-items-center justify-content-md-end pr-0 pl-0">
								<Tooltip title="Add User">
									<button
										type="button"
										className="primary-button ml-0 ml-md-3 mr-3"
										onClick={handleClick}
									>
										Add User
									</button>
								</Tooltip>
								<div className="filter-wrap">
									<FilterDropDwon
										data={userRoles}
										handleClickSelect={handleClickSelect}
										selectedRole={selectedRole}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid">
				<div
					className="table-custom custom-tabe-tooltip"
					data-test="custome-table"
				>
					<CustomeTable
						columns={UserColumns}
						data={userList.data}
						pending={loading}
						pagination={false}
						disabledJumpTo={false}
						custompagination
						paginationServer={false}
						noDataString={"No data found"}
						totalListCount={totalCount}
						paginationTotalRows={totalCount}
						paginationPerPage={pageSize}
						onPageChangedCalled={handlePageChange}
						pageNumber={pageNumber}
						handleDropdownChange={handleDropdownChange}
						limit={pageSize}
						onSort={handleSort}
					/>
				</div>
			</div>
			<OpenModal
				isOpen={showModal}
				onCancelClickListner={handleCloseModal}
				userName={userName}
				deactivateUser={deactivateUser}
				userId={userId}
				userStatus={userStatus}
				editFlag={editFlag}
			/>
			<SupportButton/>
		</div>
	);
};

export default UserList;
