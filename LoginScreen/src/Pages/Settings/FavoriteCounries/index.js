import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/* Component */
import SearchHeaderText from "../../../Components/SearchHeaderText/SearchHeaderText";
import ImageLoader from "../../../Components/ImageLoader/ImageLoader";
import SupportButton from "../../../Components/SupportButton";
import MySelect from "../../../Components/MultiselectDropDown/MySelect";
import constants from "../../../utils/constants";
import ImageRender from "../imageRender";

/* Icon */
import closeBtn from "../../../assets/images/removeBtn.svg";
import watermarkImg from "../../../assets/images/placeholder-img.svg";

/* Action */
import {
  callDeleteCountryAPI,
  callgetEmployeeType,
  callgetUserCountry,
  callgetUserCountryDetails,
  callUpdateEmployeeCountListAPI,
} from "../../../Store/reducers/favoriteCountries";

const FavoriteCountries = (props) => {
  document.title = "Settings";
  const history = useHistory();
  const [countryList, setCountryList] = useState([]);
  const [editModeList, setEditModeList] = useState([]);
  const [empData, setEmpData] = useState([]);

  const dispatch = useDispatch();
  const countries = useSelector(
    (state) => state?.favoriteCountriesReducer?.userCountryList
  );
  const employeeType = useSelector(
    (state) => state?.favoriteCountriesReducer?.employeeType
  );
  const countryData = useSelector(
    (state) => state?.favoriteCountriesReducer?.UserCountryData
  );
  const deleteError = useSelector(
    (state) => state?.favoriteCountriesReducer?.deleteError
  );
  const countryDeleted = useSelector(
    (state) => state?.favoriteCountriesReducer?.countryDeleted
  );
  const userId = useSelector((state) => state?.user?.userProfile?.userId);
  const addEditModeItem = (item) => {
    let arr = [...editModeList];
    if (arr.includes(item.countryID)) {
      // arr.pop(item.countryID);
    } else {
      arr.push(item.countryID);
      setEditModeList(arr);
    }
  };

  const removeEditModeListItem = (item) => {
    let arr = [...editModeList];
    if (arr.includes(item.countryID)) {
      let editItemIndex = arr.findIndex(
        (editItem) => item.countryID == editItem
      );
      arr.splice(editItemIndex, 1);
      setEditModeList(arr);
    }
  };

  const handleChange = (e, item, index) => {
    let { value } = e.target;
    const regex = new RegExp(/^[0-9]+\.[0-9]*$/);
    if (regex.test(value)) {
      value = value.replace(".", value[value.length - 1]);
      value = value.replace(value[value.length - 1], "");
    }
    addEditModeItem(item);
    let _list = [...countryList];
    _list[index].employeeCount = value;
    _list[index].isEditFlag = true;
    setCountryList(_list);
  };
  const removeDefaultVal = (e, item, index) => {
    console.log("eee", e.target.defaultValue);
  };

  const updateDropdown = (selected, item) => {
    addEditModeItem(item);
    let tempData = [...countryList];
    const index = tempData.findIndex((x) => x.id === item.id);
    tempData[index].value = selected;
    tempData[index].isEditFlag = true;
    setCountryList(tempData);
  };

  useEffect(() => {
    dispatch(callgetUserCountry({ userId }));
    dispatch(callgetUserCountryDetails({ userId }));
    dispatch(callgetEmployeeType());
  }, [userId]);

  useEffect(() => {
    if ((countries, countryData, employeeType)) {
      let temp = {};
     countryData.length&&countryData?.forEach((element) => {
        temp[element.id] = element;
      });
      const data =
        countries.employeeCountryCount &&
        countries.employeeCountryCount.map((item) => {
          if (temp[item.countryID]) {
            const newData = temp[item.countryID];
            return { ...newData, ...item };
          }
          return item;
        });
      setCountryList(data);
    }

    let _contryList = countries?.employeeCountryCount;
    const employeeTypeIds =
      _contryList &&
      _contryList.map((country) => {
        let list =
          country.employeeTypes &&
          country.employeeTypes.map((employeType) => {
            let arr = employeeType.filter(
              (item) => item.id == employeType.employeeTypeId
            );
            return {
              name: arr && arr.length > 0 ? arr[0].name : "",
              id: employeType.employeeTypeId,
            };
          });
        return { list };
      });

    setEmpData(employeeTypeIds);
  }, [countries, countryData, employeeType]);

  useEffect(() => {
    if (deleteError && deleteError.length) {
      props.notify(deleteError);
    }
  }, [deleteError]);

  const updateCountryList = async (e, item, index) => {
    e.preventDefault();
    removeEditModeListItem(item);
    let temp = [...countryList];
    temp[index].isNewlyAdded = false;
    setCountryList(temp);
    let employeeCountryCount = [
      {
        id: item.id,
        countryID: item.countryID,
        employeeCount: item.employeeCount,
        EmployeeTypes:
          item.value && item.value.length
            ? item.value.map((x) => ({
              UserId: userId,
              CountryId: item.countryID,
              EmployeeTypeId: x.id,
            }))
            : [],
      },
    ];
    let data = { userId, employeeCountryCount };
    await dispatch(callUpdateEmployeeCountListAPI({ data }));
    props.notify("Changes Saved Successfully");
  };

  const handleDeleteCountry = async (id) => {
    await dispatch(callDeleteCountryAPI({ id }));
    await dispatch(callgetUserCountry({ userId }));
    await dispatch(callgetUserCountryDetails({ userId }));
    props.notify("Country Removed from Favorites");
  };

  return (
    <div>
      <SearchHeaderText breadcrumb={true} favotiteCountries={true} />
      <div className="container-fluid" data-test="add-countries">
        <div className="fav-container">
          <div className="col-12">
            <div className="row">
              <div className="col-8 pl-0">
                <div className="header-section fav-header">
                  <h2>
                    How many employees do you currently have in each location?
                  </h2>
                  <h4>
                    This information will help us give you compliance updates
                    and other useful insights.
                  </h4>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <button
                  type="button"
                  className="primary-custome-btn"
                  onClick={() => {
                    history.push(
                      `${constants.ROUTE.SIDEBAR.SETTINGS.ADD_COUNTRY}`
                    );
                  }}
                >
                  Add Country
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="country-wrapper" data-test="country-wrapper">
          {countryList &&
            countryList.map((item, index) => {
              if(item.country_Name && item.country_Code) {
                return (
                  <div className="fav-country-container">
                    <div className="country-name">
                      <div className="country-list ld_country-list">
                        <span>
                          <span className="country-list-active ml-2">
                            {item.country_Name}
                          </span>
                        </span>
                        <div className={(item.flag_Upload_Id && item.flag_Upload_Id != null) ? "flag" : "blank-flag flag"}>
                          <ImageRender url= {item.flag_Upload_Id} />
                        </div>
                        {item && item.isNewlyAdded ? (
                          <div className="success_msg_txt">
                            Just Added to Favorites!
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
  
                    <div className="fav-count">
                      <div key={`${item}-${index}`}>
                      <input
                        className={` form-control ld_form-ctrl ${item.employeeCount === 0 ? "disbale-ctrl" : ""}`}
                        name={item.id}
                        type="number"
                        min="1"
                        step="1"
                         placeholder="0"
                        id={item.id}
                        value={item.employeeCount!== 0 && item.employeeCount}
                        // onMouseEnter={(e) => item.employeeCount === 0 ? "" : 0}
                        onChange={(e) => handleChange(e, item, index)}
                      />
                      </div>
                    </div>
                    <div className="select-dropdown">
                      <MySelect
                        // className={` ${item.value == "" || empData[index].list == "" ? "disbale-ctrl" : ""}`}
                        // className="disbale-ctrl"
                        data={employeeType}
                        labelKey="name"
                        placeholder="Employee Type"
                        valueKey="id"
                        value={item.value || empData[index].list}
                        updateDropdown={(selected) =>
                          updateDropdown(selected, item)
                        }
                      />
                    </div>
                    <div className="save-btn">
                      {editModeList.includes(item.countryID) ||
                        item.isNewlyAdded ? (
                        <button
                          className="btn btn-primary"
                          onClick={(e) => updateCountryList(e, item, index)}
                        >
                          Save
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
  
                    <div className="remove-btn">
                      <span onClick={() => handleDeleteCountry(item.id)}>
                        <img src={closeBtn} alt="" />
                        Remove from favorites
                      </span>
                    </div>
                  </div>
                );
              }

              return null;
            })}
        </div>
      </div>
      <SupportButton/>
    </div>
  );
};

export default FavoriteCountries;
