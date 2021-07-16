import React, { useEffect, useState } from "react";
import Card, { CardLoader } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import PopularCountryCarousel from "./PopularCountryCarousel";
import Pulse from "./Pulse";
import PopularContentCarousel from "./PopularContentCarousel";
import TutorialOverlay from "../Success";
import { getUserProfile, isLastLoginAttempted } from "../../utils/storage";
import HeaderText from "./HeaderText";
import ComparePopup from "../CountryCompare/ComparePopup";
import SupportButton from "../../Components/SupportButton"

import {
  getBlogSolutionId,
  getAllCountryList,
  getExpertSolutionId,
  getPopularContentList,
  getPopularCountryList,
  getUserCountryList,
  getAccoutOwnerUserProfile,
  getPulseMapContent,
} from "../../Store/reducers/country";
import { updateLastLogin } from "../../Store/reducers/user";
// import "slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css"
import "./slickcustom.css";
import constants from "../../utils/constants";

const expertSolutionName = "Consulting - Ask an Expert - Expert Profile";
const expertSolutionCount = 1;
const blogSolutionCount = 1;

const Home = (props) => {
  const history = useHistory();
  const [CountryID, setCountryIds] = useState([]);
  const [data, setData] = useState({});
  const [userData, setUserData] = useState();
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [popRender, setPopRender] = useState(false);
  const solutionName = "Popular Countries Template";

  const [activePulseTab, setActivePulseTab] = useState("gdp");
  const [activePulseTabLoader, setActivePulseTabLoader] = useState(false);

  const dispatch = useDispatch();
  // const countryList = [];
  const countryList = useSelector((state) => state.country.countryList);
  const userCountryLoading = useSelector(
    (state) => state.country.userCountryLoading
  );
  const popularCountryList = useSelector(
    (state) => state.country.popularCountryList
  );
  const popularContent = useSelector((state) => state.country.popularContent);
  const blogSolutions = useSelector((state) => state.country.blogSolutions);
  const expertSolutions = useSelector((state) => state.country.expertSolutions);
  const allCountry = useSelector((state) => state.country.allCountry);
  const pulseMapContent = useSelector(
    (state) => state.country.pulseMapContent?.data
  );
  const pulseBoxContent = useSelector(
    (state) => state.country.pulseMapContent?.pulse
  );

  const accoutOwnerUserData = useSelector(
    (state) => state.country.accoutOwnerUserData
  );
  const getAccoutOwner = (id) => {
    if (id && id !== "00000000-0000-0000-0000-000000000000")
      dispatch(getAccoutOwnerUserProfile(id));
  };
  useEffect(() => {
    var user_data = getUserProfile();
    setUserData(user_data);
    getAccoutOwner(user_data.createdBy);
    if (!isLastLoginAttempted()) {
      console.log("last login not attmpted", userData);
      dispatch(updateLastLogin({ user_id: user_data?.userId }));
    }
    dispatch(getUserCountryList({ id: user_data?.userId }));
    dispatch(getPopularCountryList());
    dispatch(getPopularContentList());
    dispatch(getAllCountryList());
    dispatch(getPulseMapContent());
    dispatch(getBlogSolutionId({ count: blogSolutionCount }));
    dispatch(
      getExpertSolutionId({
        count: expertSolutionCount,
        data: {
          solutionName: [expertSolutionName],
        },
      })
    );
    if (CountryID) {
      setData({
        ...data,
        CountryIds: CountryID,
        solutionName: solutionName,
      });
    }
    document.title = "Home";
    setShowTutorial(sessionStorage.getItem("showTutorial"));
  }, []);

  const roleName = userData?.roleName;
  console.log("rolename", roleName);
  const setActivePulseTabs = (value) => {
    setActivePulseTab(value);
    setActivePulseTabLoader(true);
    setTimeout(() => {
      setActivePulseTabLoader(false);
    }, 200);
  };
  return (
    <div data-test="indexDiv">
      <div className="container-fluid">
        {showTutorial ? (
          <TutorialOverlay
            onClose={() => {
              setShowTutorial(false);
              window.scrollTo(0, 0);
            }}
          />
        ) : null}
        <HeaderText user={userData} />
        <div className="row auto-grid">
          {userCountryLoading ? (
            [1, 2, 3, 4, 5, 6].map((item) => <CardLoader noClass />)
          ) : (
            <>
              {countryList && countryList.length ? (
                countryList.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      // expertID={expertID}
                      name={item.country_Name}
                      country={item}
                      className="border-maroon"
                      bullet="maroon_bg"
                      blogCount={2}
                      expertSolutions={expertSolutions}
                      blogSolutions={blogSolutions}
                    />
                  );
                })
              ) : (
                <>
                  {/*  Empty country List  */}

                  {roleName === "expandopedia_admin" || roleName === "CompanyAdmin" ? (
                    <div className="grid-full-row col-12">
                      <div className="card-status-container">
                        <div className="no-card-msg">
                          <span>
                            Add countries to your{" "}
                            <Link
                              to={
                                
                                constants.ROUTE.SIDEBAR.SETTINGS
                                  .FAVORITE_COUNTRIES
                              }
                            >
                              Favorites
                            </Link>{" "}
                            to see them here every time you log in.
                          </span>
                          <button
                            onClick={() =>
                              history.push(
                                `${constants.ROUTE.SIDEBAR.SETTINGS.ADD_COUNTRY}`
                              )
                            }
                            className="ml-auto btn btn-primary"
                          >
                            Add Country
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid-full-row col-12">
                      <div className="card-status-container">
                        <div className="no-card-msg">
                          Don’t see any Favorite countries here? Contact your
                          Account Owner,{" "}
                          <span className="text-info">
                            {accoutOwnerUserData?.userProfile?.firstName}
                            {accoutOwnerUserData?.userProfile?.lastName}
                          </span>{" "}
                          to view countries added to Favorites for your company.
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="row">
          <div className="country-action-wrapper col-12">
            <div className="row">
              <div className="col-md-6">
                <a
                  href
                  onClick={() => {
                    setPopRender(true);
                    setShowDialog(true);
                  }}
                  className="btn btn-primary"
                >
                  Compare Countries
                </a>
                {popRender && (
                  <ComparePopup
                    show={showDialog}
                    onHide={() => {
                      setPopRender(false);
                      setShowDialog(false);
                    }}
                  />
                )}
              </div>
              <div className="col-md-6 text-right action-text">
                <span>Expert Hours Balance : 18.5hrs</span>
                <a
                  href
                  onClick={() =>
                    history.push(
                      `${constants.ROUTE.SUBSCRIPTION_PAGE.ALL}`
                    )
                  }>
                  Buy More
                </a>
                <span className="seperator"></span>
                <a
                  href
                  onClick={() =>
                    history.push(
                      `${constants.ROUTE.COUNTRY.ALL_COUNTRY}`
                    )
                  }>
                  Add Country
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
   
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="header_wrapper popular-country col-12 mt-3 mb-2 pr-0">
              <h2>Popular Countries</h2>
            </div>
            {
              popularCountryList ? (
            <div className="popular-card">
              <div>
                <PopularCountryCarousel
                  popularCountries={popularCountryList}
                  allCountry={allCountry}
                  countryList={countryList}
                />
              </div>
            </div>
                ) : null
              }
          </div>
        </div>
      </>

  <Pulse
    activePulseTab={activePulseTab}
    setActivePulseTab={setActivePulseTabs}
    pulseMapContent={pulseMapContent}
    activePulseTabLoader={activePulseTabLoader}
    pulseBoxContent={pulseBoxContent}
  />
  {
    popularContent ? (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="header_wrapper pulse-header col-12 mt-3 mb-2">
              <h2>Popular Content</h2>
            </div>
          </div>
          <div className="row">
            <div className="popular-content">
              <div>
                <PopularContentCarousel popularContent={popularContent} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" mt-5 mb-5">
              <a href="#"></a>
            </div>
          </div>
          <SupportButton />

        </div>
      </>
    ) : null
  }
    </div >
  );
};

export default Home;
