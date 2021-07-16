import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  callAddSuperAdminUser,
  callgetAdministratorRole,
  callgetCompanyList,
} from "../../Store/reducers/superAdminUser";

const SuperAdminAddUser = (props) => {
  document.title = "Settings";
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    CompanyId: 0,
    RoleId: "00000000-0000-0000-0000-000000000000",
    industryName: "",
  });

  const dispatch = useDispatch();
  const roleData = useSelector(
    (state) => state.superAdminUserReducer.administratorRole
  );
  const addUser = useSelector((state) => state.superAdminUserReducer.addUser);

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
    dispatch(callgetAdministratorRole());
    dispatch(callgetCompanyList());
  }, []);

  // useEffect(() => {
  //   if (roleData && roleData.length) {
  //     const temp =
  //       roleData &&
  //       roleData.filter((role) => role.description == "");
  //     setInitialValues({
  //       ...initialValues,
  //       RoleId: temp && temp.length ? temp[0].id : "",
  //     });
  //   }
  // }, [roleData]);

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleRole = (e) => {
    let value = userRoles?.filter((x) => x.roleName == e.target.value);
    setInitialValues({
      ...initialValues,
      RoleId: value[0].id,
    });
  };

  const handleChangeCompany = (e) => {
    let value = companyData.filter((x) => x.companyName == e.target.value);
    setInitialValues({
      ...initialValues,
      CompanyId: value[0].id,
      industryName: value[0].industryName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      callAddSuperAdminUser({
        initialValues,
        history: history,
        notify: props.notify,
      })
    );
  };
  return (
    <div data-test="superAdminAddUser">
      <SearchHeaderText
        breadcrumb={true}
        titleHeader={true}
        pageTitle="Add User"
        onClick={handleSubmit}
        user={userData}
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
                  placeholder="Select Company"
                  htmlFor="companyName"
                  data_content="Company*"
                  title="Company"
                  value={initialValues.CompanyId}
                  data={companyList ? companyList : ""}
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
                  name="RoleId"
                  placeholder="Select Role"
                  htmlFor="role"
                  data_content="Role*"
                  title="Role"
                  data={userRoles}
                  value={initialValues.RoleId}
                  onChange={handleRole}
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

export default SuperAdminAddUser;
