import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../utils/storage";
import HeaderText from "./AllCountryHeader";
import { CardLoader, CountryCard } from "./CountryCard";

/* Icons */
import countryImage from "../../assets/images/Hero-image-Africa.jpg";
import flagIcon from "../../assets/images/flag.svg";
import upArrow from "../../assets/images/up-arrow.svg";
import SupportButton from "../../Components/SupportButton"

/* Action */
import {
  callgetRegionListAPI,
} from "../../Store/reducers/favoriteCountries";

import {
  getAllCountriesList,
} from "../../Store/reducers/country"

const AllCountryPage = (props) => {
  const prevScrollY = useRef(null)
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultListPageCount = 20;
  const defaultParam = {
    body: {
      from: 0,
      to: 20,
      regionId: [0],
      supertopicNames: ["Advantages", "Risk Factors"]
    },
    loadMore: false
  };
  const [userData, setUserData] = useState();
  const [isValidShowMore, setIsValidShowMore] = useState(true);
  const [countryApiParam, setDefaultParams] = useState(defaultParam);
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([0]);
  const { regionList } = useSelector((state) => state.favoriteCountriesReducer);
  const { allCountriesList, allCountriesLoading, allCountriesLength } = useSelector((state) => state.country);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    var user_data = getUserProfile();
    setUserData(user_data);
    if (!props.testCase) dispatch(callgetRegionListAPI());

    document.title = "Countries";
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPosition]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // setCurrentPosition(currentScrollY);
    if(prevScrollY.current != null) {
      if(currentScrollY > 550) {
        prevScrollY.current.className = "scroll-to-top-button display";
      } else {
        prevScrollY.current.className = "scroll-to-top-button";
      }
    }
    // prevScrollY.current = currentScrollY;
  };


  useEffect(() => {
    if (regionList.length > 0) {
      let _sortedRegionList = [{
        id: 0,
        region_Name: "All Countries"
      }, ...regionList];
      _sortedRegionList = _sortedRegionList.sort((a, b) => a.region_Name.localeCompare(b.region_Name));
      setRegions(_sortedRegionList);
    }
  }, [regionList]);

  useEffect(() => {
    if (!props.testCase) {
      const finalParam = {
        ...countryApiParam,
      };
      finalParam.body.regionId = finalParam.body.regionId.filter(x => x != 0);
      dispatch(getAllCountriesList(countryApiParam))
    };
  }, [countryApiParam]);

  useEffect(() => {
    if (allCountriesList && allCountriesList.length > 0 && allCountriesLength != 20) {
      setIsValidShowMore(false);
    }
  }, [allCountriesLength]);

  const onNavigateCountryDetailsPage = (item) => {
    if (item.isFavourite) {
      history.push(`/details/${item.countryName}/${item.countryId}`)
    } else {
      history.push(`/unfavorite-countries/${item.countryName}/${item.countryId}`)
    }
  };

  const onChangeRegion = (region) => {
    if (!!region.id) {
      let regionFilteredList = selectedRegions.filter((reg) => reg != 0);
      if (regionFilteredList.includes(region.id)) {
        let filteredRegion = regionFilteredList.filter((reg) => reg != region.id);
        if (filteredRegion.length > 0) {
          setSelectedRegions(filteredRegion)
          setDefaultParams({ body: { ...defaultParam.body, regionId: [...filteredRegion] }, loadMore: false })
        } else {
          setSelectedRegions([0])
          setDefaultParams({ body: { ...defaultParam.body, regionId: [] }, loadMore: false })
        }
      } else {
        setSelectedRegions([...regionFilteredList, region.id])
        setDefaultParams({ body: { ...defaultParam.body, regionId: [...regionFilteredList, region.id] }, loadMore: false })
      }
    } else {
      setSelectedRegions([0])
      setDefaultParams({ body: { ...defaultParam.body, regionId: [0] }, loadMore: false })
    }
    setIsValidShowMore(true);
  };

  const loadMoreCountries = () => {
    const param = { ...countryApiParam };
    param.body.from = countryApiParam.body.from + defaultListPageCount;
    param.body.to = countryApiParam.body.to + defaultListPageCount;
    param.loadMore = true;
    param.previousList = [...allCountriesList];
    setDefaultParams(param);
  };

  const validCountries = (list) => {
    return list.filter((item) => item.topics != null);
  };

  console.log('prevScrollY', prevScrollY)
  return (
    <div className="all-country-wrapper" data-testid="AllCountryPage-result-page">
      <div className="container-fluid">
        <HeaderText user={userData} />
      </div>
      <div className="container-fluid">
        <div className="tag-header">
          <h5>Countries by region</h5>
        </div>
        <div className="tags">
          {
            regions.map((item) => {
              return (<span key={Math.random().toString(36).substr(2, 5)} data-testid="changeRegion" onClick={() => onChangeRegion(item)} className={selectedRegions.includes(item.id) ? "active" : ""}>{item.region_Name}</span>)
            })
          }
        </div>
      </div>
      <div className="container-fluid">
        <div className="row auto-grid">
          {
            allCountriesList && allCountriesList.map((item) => {
              return (
                <CountryCard
                  onNavigateCountryDetailsPage={onNavigateCountryDetailsPage}
                  item={item} />
              )
            })
          }
          {
            allCountriesLoading && [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <CardLoader noClass />)
          }
        </div>
      </div>
      {
        (allCountriesList && allCountriesList.length > 0 && isValidShowMore) &&
        <div className="view-more col-12">
          <span data-testid="show-more" onClick={loadMoreCountries}>Show More</span>
        </div>
      }
      {
        <div
          ref={prevScrollY}
          className={`scroll-to-top-button`}
          onClick={() => window.scrollTo(0, 80)}
        >
          <img src={upArrow} alt="" />
        </div>
      }

      <SupportButton/>
    </div>
  );
};

export default React.memo(AllCountryPage);