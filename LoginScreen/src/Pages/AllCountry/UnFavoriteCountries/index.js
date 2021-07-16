import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css"
import "../../Home/slickcustom.css";

/* Icon */
import unfavPin from "../../../assets/images/unfav.svg";
import compareIcon from "../../../assets/images/compare_outline_1.svg";
import shareIcon from "../../../assets/images/share_icon_1.svg";
import pinIcon from "../../../assets/images/pin.svg";
import playIcon from "../../../assets/images/bi_play.svg";

/* Component */
import ChartBullet from "../../CountryDetails/ChartBullet";
import SnapShot from "../../CountryDetails/Snapshot";
import CountrySpecifics from "../../CountryDetails/CountrySpecifics/index";
import ComparePopup from "../../CountryCompare/ComparePopup";
import { getUserProfile } from "../../../utils/storage";
import ShareModal from "../../CountryDetails/ShareModal";
import SearchBar from "../../../Components/SearchBar";
import constants from "../../../utils/constants";
import EmployeeLifeCycle from "../../CountryDetails/EmployeeLifeCycle";
import PopularContentCarousel from "../../Home/PopularContentCarousel";
import SupportButton from "../../../Components/SupportButton"


/* Action */
import {
  callGetCountryDeatils,
  callGetSnapShotAPI,
  callGetSnapShotListDataAPI,
  callGetCountryChartIndiactor,
  employeeLifeCycle,
  callGetSpecificsAPI,
  getEmployeeLifeCycle,
  fetchPopularContentForCountry,
  fetchRegionList,
  callGetSpecificsDataforLifecycleAPI,
  getArticles,
  addtoFavorite,
  deleteFromFavorite,
  callgetUserCountryDetails
} from "../../../Store/reducers/country";

const UnFavoriteCountries = (props) => {
  const [countryChartData, setCountryChartData] = useState([]);
  const [sharePopupModal, setSharePopupModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userData, setUserData] = useState();
  const [popRender, setPopRender] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [selectedLifecycle, setSelectedLifecycle] = useState(false);
  const [onBoard, setonBoard] = useState();
  const [attract, setAttract] = useState();
  const [develop, setDevelop] = useState();
  const [offBoard, setoffBoard] = useState();
  const [activeFlag, setActiveFlag] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(true)
  const [labourAndProductivity, setLabourAndProductivity] = useState(false)
  

  let { id, country } = useParams();
  const snapshot_count = 1;
  const specifics_count = 1;
  const count = 1;
  var lifeCycleId = []
  
  const history = useHistory();
  const dispatch = useDispatch();
  const fromHome=history?.location?.state?.fromHome
  const countryName = useSelector((state) => state?.country?.CountryDetails);
  const snapshostData = useSelector((state) => state?.country?.SnapShotData);
  const snapshotId = useSelector((state) => state?.country?.solutionId);
  const ChartData = useSelector((state) => state?.country?.ChartData);
  const specificsId = useSelector((state) => state?.country?.specificSolutionId);
  const specificsData = useSelector((state) => state?.country?.specificLifecycleData);
  const lifeCycleData = useSelector((state) => state?.country?.lifeCycleData);
  const attractId = useSelector((state) => state?.country?.attractId);
  const onBoardId = useSelector((state) => state?.country?.onBoardId);
  const developId = useSelector((state) => state?.country?.developId);
  const offBoardId = useSelector((state) => state?.country?.offBoardId);
  const popularContent = useSelector((state) => state?.country?.allArticles?.data);
  const userId = useSelector((state) => state?.user?.userProfile?.userId);
  const regionId = useSelector((state) => state?.country?.CountryDetails?.region_Id);
  const mapping_id = useSelector((state) => state?.country?.addedtofav?.countryMappingId);
  const employeeCount = useSelector((state) => state?.country?.employeeCount);
  const regionName = countryName?.defaultRegion?.regionName;
  const { countryadded, deleteErr, detetedSuccess, countryaddedErr } = useSelector((state) => state?.country?.countryStatus);
 console.log("countryName", countryName);
  console.log("snapshotId", snapshotId);
  console.log("SnapShotData", snapshostData);
  useEffect(async () => {
    dispatch(fetchRegionList({ regionId }));
  }, [regionId]);

  useEffect(async () => {
    if (countryName && countryName != null) {
      document.title = countryName.country_Name;
    }
  }, [countryName]);

  useEffect(() => {
    const initialRequest = {
      solutionName: [
        "Knowledge Base - Insights and Analysis - Articles",
        "Knowledge Base - Insights and Analysis - Blogs",
        "Knowledge Base - Insights and Analysis - Whitepaper"],
      GeographicTags: [],
      TrimContent: true,
      Tags: [countryName ? countryName.country_Name : ""],
    };
    dispatch(getArticles(initialRequest));
  }, [countryName]);



  useEffect(() => {
    var user_data = getUserProfile();
    setUserData(user_data);
    if (id != null) {
      // API for getting chart data
      dispatch(callGetCountryChartIndiactor({ id }));

      // API for getting country details (displayed in header part)
      dispatch(callGetCountryDeatils({ id }));

      //  snapshot api calling for getting snapshot id
      dispatch(callGetSnapShotAPI({ id, snapshot_count }));

      // specifics API for getting specific id
      dispatch(callGetSpecificsAPI({ id, specifics_count }));

      // employee lifecycle for getting lifecycle data
      dispatch(employeeLifeCycle({
        solutionName: [
          "Employee Management - Employee Lifecycle - Attract",
          "Employee Management - Employee Lifecycle - Onboard",
          "Employee Management - Employee Lifecycle - Develop and Retain",
          "Employee Management - Employee Lifecycle - Offboard",
        ],
        countryIds: [id],
      })
      );
      //getting popular content for specific country
      dispatch(fetchPopularContentForCountry({ id, count }));
    }
    setLabourAndProductivity(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (attractId.length || onBoardId.length || developId.length || offBoardId.length)
      lifeCycleId = [attractId[0], onBoardId[0], developId[0], offBoardId[0]]
    if (lifeCycleId.length > 0) {
      dispatch(getEmployeeLifeCycle(lifeCycleId))
    }
  }, [attractId, onBoardId, developId, offBoardId])

  useEffect(() => {
    if (ChartData) {
      const { countryData, globalAverage, globalMedian, maxValues } = ChartData;
      const res_data = [
        {
          category: "Country GDP(B-USD)\n(logarithmic)",
          value: countryData?.gdp,
          median: globalMedian?.gdp,
          average: globalAverage?.gdp,
          maxValue: maxValues?.gdp,
          isLogChart: "true",
        },
        {
          category: "GDP(K-USD)\n(per person employed)",
          value: countryData?.gdP_PP_employed,
          median: globalMedian?.gdP_PP_employed,
          average: globalAverage?.gdP_PP_employed,
          maxValue: maxValues?.gdP_PP_employed,
          isLogChart: "false",
          isKdollar: "true",
        },
        {
          category: "Unemployment (%)",
          value: countryData?.unemployment,
          median: globalMedian?.unemployment,
          average: globalAverage?.unemployment,
          maxValue: maxValues?.unemployment,
          isLogChart: "false",
          isPercent: "true",
        },
        {
          category: "Productivity\nIndustry Employee\n(K-USD)",
          value: countryData?.productivity_Industry_Employee,
          median: globalMedian?.productivity_Industry_Employee,
          average: globalAverage?.productivity_Industry_Employee,
          maxValue: maxValues?.productivity_Industry_Employee,
          isLogChart: "false",
          isKdollar: "true",
        },
        {
          category: "Productivity\nServices Employee\n(K-USD)",
          value: countryData?.productivity_Services_Employee,
          median: globalMedian?.productivity_Services_Employee,
          average: globalAverage?.productivity_Services_Employee,
          maxValue: maxValues?.productivity_Services_Employee,
          isLogChart: "false",
          isKdollar: "true",
        },
        {
          category: "Productivity\nAgriculture\nEmployee(K-USD)",
          value: countryData?.productivity_Agriculture_Employee,
          median: globalMedian?.productivity_Agriculture_Employee,
          average: globalAverage?.productivity_Agriculture_Employee,
          maxValue: maxValues?.productivity_Agriculture_Employee,
          isLogChart: "false",
          isKdollar: "true",
        },
        {
          category: "Employer Tax",
          value: countryData?.employer_Tax,
          median: globalMedian?.employer_Tax,
          average: globalAverage?.employer_Tax,
          maxValue: maxValues?.employer_Tax,
          isLogChart: "false",
        },
        {
          category: "Employee Tax",
          value: countryData?.employee_Tax,
          median: globalMedian?.employee_Tax,
          average: globalAverage?.employee_Tax,
          maxValue: maxValues?.employee_Tax,
          isLogChart: "false",
        },
      ];
      setCountryChartData(res_data);
    }
  }, [ChartData]);

  // getting snapshot data from snapshot id
  useEffect(() => {
    dispatch(callGetSnapShotListDataAPI({  id, snapshotId }));
  }, [snapshotId]);

  useEffect(() => {
    if (specificsData.length > 0) {
      if (selectedLifecycle) {
        onLifeCycleDataClick();
      }
    }
  }, [specificsData]);

  // getting data using specifics API
  useEffect(() => {
    if (specificsId != null) {
    dispatch(callGetSpecificsDataforLifecycleAPI({ specificsId: [specificsId] }));
    }
  }, [specificsId]);

  useEffect(() => {
    getEmployeeData();
  }, [lifeCycleData]);


  useEffect(async () => {
    console.log("activeFlag", activeFlag);
    if (activeFlag === true) {
      await dispatch(addtoFavorite({ id }));
    } else if (activeFlag === false) {
      await dispatch(deleteFromFavorite({ id: mapping_id }));
    }
  }, [activeFlag]);

  useEffect(async () => {
    await dispatch(callgetUserCountryDetails({ userId, id }));
  }, []);

  useEffect(async () => {
    if (countryaddedErr && countryaddedErr.length) {
      props.notify(countryaddedErr);
    } else if (countryadded && countryadded === 200) {
      props.notify("Country added to favorites");
      history.push(`${constants.ROUTE.DETAILS_PAGE.DETAILS}${id}`)
    }
  }, [countryaddedErr, countryadded]);

  useEffect(async () => {
    if (deleteErr && deleteErr.length) {
      props.notify(deleteErr);
    } else if (detetedSuccess && detetedSuccess === 200) {
      props.notify("Country removed from favorites");
      await dispatch(deleteFromFavorite({ success: true }));

    }
  }, [deleteErr, detetedSuccess]);


  const getEmployeeData = () => {
    setAttract(getData(attractId[0]));
    setonBoard(getData(onBoardId[0]));
    setDevelop(getData(developId[0]));
    setoffBoard(getData(offBoardId[0]));
  };
  // getting lifecycle Data
  const getData = (id) => {
    let attract = [];
    lifeCycleData?.map((item) => {
      item.subcategorySettings.map((data) => {
        item.superTopicMetadatas.map((metaData) => {
          if (data.contenId === metaData.supertopicContentId) {
            if (item.solutionId === id) {
              attract.push(metaData)
            }

          }
        })
      })
    })
    return attract.length ? attract : ""
  }

  // get Diffdate logic
  const timeDiffCalc = (dateFuture, dateNow) => {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day ago ` : `${days} days ago `;
    }
    return difference;
  };
  const OpenSharePopupModal = () => setSharePopupModal(true);

  const handleChangePin = (activeFlag) => {
    setActiveFlag(!activeFlag);
  };

  const callGetSpecificsAPIDataAction_details = (specificsId_data, id, _sTopicContentId) => {
    setTopicsLoading(true)
    dispatch(callGetSpecificsDataforLifecycleAPI({ specificsId: [specificsId_data], _sTopicContentId }));
    setTopicsLoading(false)
  };

  const OnChangeEmployeeLifeCycle = (items, _index) => {
    setTopicsLoading(false)
    callGetSpecificsAPIDataAction_details(_index, id, items.supertopicContentId)
    setSelectedLifecycle(items)
  }


  const onLifeCycleDataClick = () => {
    let targetEl = document.getElementById("specific-header");
    if (targetEl != null) {
      window.scrollTo(0, targetEl.offsetTop - 50)
    }
    setSelectedLifecycle(false)
  }

  const isValidLabour_productivity = (data) => {
    if (!labourAndProductivity) {
      let divideByBillion = 1000000000, divideByThousand = 1000, defaultValue = 0;
      if (data && data.length > 0) {
        data.map((item) => {
          if (item.maxValue > 0) {
            if (item.isLogChart === "true") {
              defaultValue = divideByBillion;
            }

            if (item.isKdollar === "true") {
              defaultValue = divideByThousand;
            }

            if (item.isPercent === "true") {
              if ((item.value).toFixed(0) < 1) {
                setLabourAndProductivity(true);
              }
            } else {
              if ((item.value / defaultValue).toFixed(0) < 1 && item.maxValue > 0) {
                setLabourAndProductivity(true);
              }
            }
          }
        });
      }
    };

    return data;
  };
console.log("home",history.location.state);
  return (
    <div data-testid="UnFavoriteCountries-page">
      <div className="ip_header_wrap" >
        <div className="ip_banner-img">
          <img
            src={
              countryName?.header_Image_Id
                ? `${constants.IMAGE.DOWNLOAD}${countryName.header_Image_Id}`
                : ""
            }
          />
        </div>
        <div className="ip_banner_gradient"></div>
        <div className="container-fluid">
          <div className="row">
            <SearchBar
              countryName={countryName ? countryName.country_Name : false}
              countryId={id}
              noRow
              user={userData}
              theme="dark"
            />
            <div className="breadcrumb-w">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {
                   ( country &&!fromHome)?
                      <li className="breadcrumb-item">
                        <Link to="/all-country">All Countries</Link>
                      </li> :
                      <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                      </li>
                  }
                  <li className="breadcrumb-item" aria-current="page">
                    <a href="#">
                      {countryName ? countryName.country_Name : "Country"}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="country-name-container">
              <h3>{countryName ? countryName.country_Name : null}</h3>
              <img
                src={
                  countryName?.flag_Upload_Id
                    ? `${constants.IMAGE.DOWNLOAD}${countryName.flag_Upload_Id}`
                    : ""
                }
              ></img>
            </div>
            <div className="title-action-wrap">
              <div className="row">
                <div className="col-lg-9">
                  <div className="updated-info updated-info-unfavorite-con">
                    <div className="">
                      <span>
                        Last updated:{" "}
                        {countryName
                          ? timeDiffCalc(
                            new Date(),
                            new Date(countryName.updated_At)
                          )
                          : ""}
                      </span>
                    </div>
                    <div className="">
                      <span>Region: {regionName ? regionName : ""}</span>
                    </div>

                    <button className="updated-info-play-btn">
                      <img alt="" src={playIcon} />
                    </button>
                  </div>
                </div>
                <div className="col-lg-3 col-12 d-flex justify-content-end">
                  <span
                    className="actions"
                    onClick={() => {
                      setPopRender(true);
                      setShowDialog(true);
                    }}
                  >
                    <img
                      alt=""
                      src={compareIcon}
                      name="git-compare-outline"
                      className="compare"
                    />
                    <span className="link-style">Compare</span>
                  </span>
                  {popRender && (
                    <ComparePopup
                      id={id}
                      show={showDialog}
                      onHide={() => {
                        setPopRender(false);
                        setShowDialog(false);
                      }}
                    />
                  )}
                  <span className="actions" onClick={OpenSharePopupModal}>
                    <img
                      alt=""
                      src={shareIcon}
                      name="share-outline"
                      className="share"
                    />

                    <span className="link-style">Share</span>
                  </span>
                  <div
                    onClick={() => handleChangePin(activeFlag)}
                    className="push-pin-icon mt-1"
                  >
                    {activeFlag === true || employeeCount && employeeCount[0]?.countryID == id ? (
                      <img src={pinIcon} />
                    ) : (
                      <img src={unfavPin} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="tab-container">
          <ul className="col-md-9">
            <li>
              <a
                href
                className={`cursor-pointer ${activeItem === 1 ? "active" : ""}`}
                onClick={() => setActiveItem(1)}
              >
                LABOR &amp; EMPLOYMENT
              </a>
            </li>
            <li>
              <a
                href
                className={`cursor-pointer ${activeItem === 2 ? "active" : ""}`}
                onClick={() => setActiveItem(2)}
              >
                EMPLOYEE LIFECYCLE
              </a>
            </li>
            <li>
              <a
                href
                className={`cursor-pointer ${activeItem === 3 ? "active" : ""}`}
                onClick={() => setActiveItem(3)}
              >
                COMPLIANCE
              </a>
            </li>
            <li>
              <a
                href
                className={`cursor-pointer ${activeItem === 4 ? "active" : ""}`}
                onClick={() => setActiveItem(4)}
              >
                INDICATORS &amp; TRENDS
              </a>
            </li>
          </ul>
          {activeItem === 1 && (
            <SnapShot
              snapdata={snapshostData}
              title="Snapshots"
              countryId={id}
            />
          )}
          {activeItem === 2 && (
            <div>
              <EmployeeLifeCycle
                onClickLifecycle={OnChangeEmployeeLifeCycle}
                attract={attract}
                onBoard={onBoard}
                develop={develop}
                offBoard={offBoard}
                attractId={attractId[0]}
                onBoardId={onBoardId[0]}
                developId={developId[0]}
                offBoardId={offBoardId[0]}
              />
            </div>
          )}
          {activeItem === 3 && <div></div>}
          {activeItem === 4 && (
            <div>
              {countryChartData.length ? (
                <div>
                  <div className="tab-section row justify-content-between">
                    <div className="col-5">
                      <h3>Labor &amp; Productivity</h3>
                    </div>
                    <div className="row ">
                      <div className="row">
                        <div className="box-chart-bullet1"></div>
                        Country Value
                      </div>
                      <div className="row">
                        <div className="box-chart-bullet2"></div>
                        Global median
                      </div>
                      <div className="row mr-5">
                        <div className="box-chart-bullet3"></div>
                        Global Average
                      </div>
                    </div>
                  </div>
                  <div className="tab-2-container">
                    {isValidLabour_productivity(countryChartData).map((i, k) => {
                      if (i.value && i.median && i.average)
                        return <ChartBullet chartData={i} divId={k} />;
                    })}
                    {labourAndProductivity &&
                      <div className="country-value-unavailable">**Country Value Currently Unavailable</div>
                    }
                  </div>
                </div>
              ) : (
                <div>No data found</div>
              )}
            </div>
          )}
        </div>
      </div>



      <div className="row scrollspy-header specific-header" id="specific-header">
        <div className="col-md-3 d-flex align-items-center">
          <h3>The Specifics</h3>
        </div>
        <div className="col-md-9 d-flex justify-content-end">
          <a
            href
            onClick={() => {
              setPopRender(true);
              setShowDialog(true);
            }}
            className="btn-main"
          >
            <ion-icon name="git-compare-outline" className="chatbox" />
            <div>Compare</div>
          </a>
        </div>
      </div>
      {specificsData && specificsData.length ? (
        <div className="scrollspy-content specific-data" >
          <CountrySpecifics specifics={specificsData} />
        </div>

      ) : null}
      <div className="popular-con-carousel">
        <h3>INSIGHTS & ANALYSIS</h3>
        {popularContent && popularContent.length > 0 ?
          <PopularContentCarousel
            popularContent={popularContent}
            UnFavCountries={true}
          /> : null}
      </div>
      <SupportButton />

      <ShareModal
        isOpen={sharePopupModal}
        onCloseClickListener={() => setSharePopupModal(false)}
        specifics={specificsData}
        country_id={id}
      />
    </div>
  );
};

export default UnFavoriteCountries;
