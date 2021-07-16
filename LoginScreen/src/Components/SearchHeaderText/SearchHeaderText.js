import React from "react";
import { useHistory } from "react-router-dom";

/* Component */
import constants from "../../utils/constants";

/* Pages */
import SearchBar from "../SearchBar";

const SearchHeaderText = (props) => {
  const history = useHistory();

  const handleClickBack = () => {
    if (props.addCountry) {
      history.push(constants.ROUTE.SIDEBAR.SETTINGS.FAVORITE_COUNTRIES);
    } else {
      history.push(constants.ROUTE.SIDEBAR.SETTINGS.USERLIST);
    }
  };

  return (
    <>
    <div className="container-fluid">
      <SearchBar />
      </div>
      {props.breadcrumb ? (
        <div className="container-fluid">
          <div className="breadcrump-admin">
            <nav aria-label="breadcrumb">
              {props.userlistBreadcrumb ? (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Settings</span>
                  </li>
                  <li className="breadcrumb-item active">
                    <span className="breadcrumb-title">Users</span>
                  </li>
                </ol>
              ) : props.myAccount ? (
                <>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <span>Settings</span>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Account
                    </li>
                  </ol>
                </>
              ) : props.favotiteCountries ? (
                <>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <span>Settings</span>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Favorite Countries
                    </li>
                  </ol>
                </>
              ) : props.addCountry ? (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                   <span>Settings</span> 
                  </li>
                  <li
                    className="breadcrumb-item"
                    aria-current="page"
                    onClick={handleClickBack}
                    style={{ cursor: "pointer" }}
                  >
                    Favorite Countries
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <span>Add Country</span>
                  </li>
                </ol>
              ) : (
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <span>Settings</span>
                  </li>
                  <li className="breadcrumb-item">
                    <span
                      onClick={handleClickBack}
                      style={{ cursor: "pointer" }}
                    >
                      Users
                    </span>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <span className="breadcrumb-title">
                      {props.isEdit ? "Edit User" : "Add User"}
                    </span>
                  </li>
                </ol>
              )}
            </nav>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.titleHeader ? (
        <div className="">
          <div className="col-12">
            <div className="title-action-wrap">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-sm-6 pl-0 d-flex align-items-center fav-header">
                    <h3>
                      {props.pageTitle}
                      <span className="left-arrow">
                        <i
                          className="ph-arrow-left"
                          style={{ cursor: "pointer" }}
                          onClick={handleClickBack}
                        />
                      </span>
                    </h3>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-end pr-0">
                    <button
                      type="button"
                      className="secondary-gray-button"
                      onClick={handleClickBack}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={props.onClick}
                    >
                      {props.isEdit
                        ? props.activeUser
                          ? "Save & Reactivate User"
                          : "Save"
                        : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : props.myAccount ? (
        <>
          <div className="container-fluid main_header_ai">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <h3 className="">Account Info</h3>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={props.onClick}
                      >
                        Save
                      </button>
                    </div>
                  </div>
          </div>
        </>
      ) : props.favotiteCountries ? (
        <div className="">
          <div className="col-12">
            <div className="title-action-wrap fav-header">
              <h3 className="pl-0">Favorite Countries</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchHeaderText;
