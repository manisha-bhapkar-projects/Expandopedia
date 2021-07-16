import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Icons */
import calender from "../../assets/images/calendar-ico.svg";

/* Component */
import SearchHeaderText from "../../Components/SearchHeaderText/SearchHeaderText";
import CustomeSelectDropdown from "../../Components/CustomeSelectDropDown/CustomeSelectDropdown";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { getUserProfile } from "../../utils/storage";
import constants from "../../utils/constants";
import SupportButton from "../../Components/SupportButton"

/* Action */
import {
  callgetAdministratorRole,
  callgetCompanyList,
  callgetSpecificUserDetails,
  callUpdateSuperAdminUser,
} from "../../Store/reducers/superAdminUser";

const SuperEditAddUser = (props) => {
  document.title = "Settings";
  const history = useHistory();
  const id = props?.match?.params?.id;
  const [RoleId, setRoleId] = useState("");
  const [userData, setUserData] = useState();
  const EditFlag =
    props.location && props.location.state && props.location.state.editFlag
      ? props.location.state.editFlag
      : "";
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    CompanyId: "",
    industryName: "",
    companyName: "",
  });

  const dispatch = useDispatch();
  const roleData = useSelector(
    (state) => state.superAdminUserReducer.administratorRole
  );
  const userDetails = useSelector(
    (state) => state.superAdminUserReducer.userDetails
  );

  const userRoles =
    roleData &&
    roleData.map((x) => {
      return {
        ...x,
        id: x.id,
        value: x.roleName,
      };
    });

  const companyData = useSelector(
    (state) => state.superAdminUserReducer.companyList
  );
  const companyList =
    companyData &&
    companyData.map((x) => {
      return {
        ...x,
        id: x.id,
        value: x.companyName,
      };
    });
  useEffect(() => {
    var user_data = getUserProfile();
    setUserData(user_data);
    dispatch(callgetSpecificUserDetails({ id: id }));
    dispatch(callgetCompanyList());
    dispatch(callgetAdministratorRole());
  }, []);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      companyName: userDetails?.company?.companyName,
      CompanyId: userDetails?.company?.id,
      industryName: userDetails?.company?.industryName,
      firstName: userDetails?.userProfile?.firstName,
      lastName: userDetails?.userProfile?.lastName,
      emailId: userDetails?.emailId,
    });
  }, [userDetails]);

  useEffect(() => {
    if (roleData && roleData.length) {
      const temp =
        roleData &&
        roleData.filter((role) => role.description == "Administrator");
      setRoleId(temp && temp.length ? temp[0].id : "");
    }
  }, [roleData]);

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCompany = (e) => {
    let value = companyData.filter((x) => x.companyName == e.target.value);
    setInitialValues({
      ...initialValues,
      CompanyId: value[0].id,
      companyName: value[0].companyName,
      industryName: value[0].industryName,
    });
  };

  const request = {
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    emailId: initialValues.emailId,
    CompanyId: initialValues.CompanyId,
    RoleId: RoleId,
    industryName: initialValues.industryName,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      callUpdateSuperAdminUser({
        id,
        request,
        history: history,
        notify: props.notify,
      })
    );
  };
  return (
    <div data-test="SuperAdminEditUser">
      <SearchHeaderText
        breadcrumb={true}
        isEdit={true}
        titleHeader={true}
        pageTitle="Edit User"
        onClick={handleSubmit}
        user={userData}
        activeUser={EditFlag}
      />
      <div className="container-fluid">
        <div className="form-wrapper">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h4>User Info</h4>
              </div>
              <div className="col-lg-4">
                <div className="floating">
                  <TextFieldComponent
                    id="firstName"
                    label="First name*"
                    data-test="firstName"
                    dataContent="First name*"
                    type="text"
                    placeholder="First name*"
                    name="firstName"
                    value={initialValues.firstName}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <TextFieldComponent
                  id="lastName"
                  label="Last Name*"
                  data-test="lastName"
                  dataContent="Last Name*"
                  type="text"
                  placeholder="Last Name*"
                  name="lastName"
                  value={initialValues.lastName}
                  onChange={handleChangeValue}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className="floating">
                  <TextFieldComponent
                    id="email"
                    label="Email Address*"
                    data-test="email"
                    dataContent="Email Address*"
                    type="email"
                    name="emailId"
                    placeholder="Email Address*"
                    value={initialValues.emailId}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <CustomeSelectDropdown
                  id="companyName"
                  name="companyName"
                  htmlFor="companyName"
                  data_content="Company*"
                  title="Company"
                  Prefilled={initialValues.companyName}
                  data={companyList}
                  onChange={handleChangeCompany}
                />
              </div>
              <div className="col-lg-5">
                <CustomeSelectDropdown
                  id="industryName"
                  name="industryName"
                  htmlFor="industryName"
                  data_content="Industry"
                  title="Industry"
                  Prefilled={initialValues.industryName}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h4>Subscription Info</h4>
              </div>
              <div className="col-lg-5">
                <CustomeSelectDropdown
                  id="role"
                  name="role"
                  placeholder="Select Role"
                  htmlFor="role"
                  data_content="Role*"
                  title="Role"
                  data={userRoles}
                />
              </div>
              <div className="col-lg-5">
                <CustomeSelectDropdown
                  id="subscription"
                  name="subscription"
                  placeholder="Subscription"
                  htmlFor="subscription"
                  data_content="Subscription*"
                  title="Subscription"
                  data={userRoles}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className="floating date-picker">
                  <input
                    id="input__username"
                    className="floating__input"
                    name="username"
                    type="date"
                    placeholder="Select Registration Date"
                  />
                  <label
                    htmlFor="input__username"
                    className="floating__label"
                    data-content="Registration Date*"
                  >
                    <span className="hidden--visually">Registration Date*</span>
                  </label>
                  <span>
                    <img src={calender} />
                  </span>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="floating date-picker">
                  <input
                    id="input__username"
                    className="floating__input"
                    name="username"
                    type="date"
                    placeholder="Select Renewal Date"
                  />
                  <label
                    htmlFor="input__username"
                    className="floating__label"
                    data-content="Renewal Date"
                  >
                    <span className="hidden--visually">Renewal Date</span>
                  </label>
                  <span>
                    <img src={calender} />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-10 pl-0 pr-0">
              <div className="row">
                <div className="col-lg-4">
                  <TextFieldComponent
                    id="noOfLicenses"
                    label="No. of Licenses"
                    data-test="noOfLicenses"
                    dataContent="No. of Licenses"
                    type="number"
                    name="noOfLicenses"
                    placeholder="No. of Licenses"
                    min={1}
                  />
                </div>
                <div className="col-lg-4">
                  <TextFieldComponent
                    id="noOfHRTemplate"
                    label="No. of HR Templates"
                    data-test="noOfHRExpertHr"
                    dataContent="No. of HR Templates"
                    type="number"
                    name="noOfHRExpertHr"
                    placeholder="No. of HR Templates"
                    min={1}
                  />
                </div>
                <div className="col-lg-4">
                  <TextFieldComponent
                    id="noOfHRExpertHr"
                    label="No. of Expert Hours"
                    data-test="noOfHRTemplate"
                    dataContent="No. of Expert Hours"
                    type="number"
                    name="noOfHRTemplate"
                    placeholder="No. of Expert Hours"
                    min={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportButton/>
    </div>
  );
};

export default SuperEditAddUser;
