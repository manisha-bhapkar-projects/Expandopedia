import React, { useCallback, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

/* Component */
import UserDropdown from "../../../Components/UserDropdown";

/* Icons */
import searchIcon from "../../../assets/images/search_icon_1.svg";
import closeIcon from "../../../assets/images/close.svg";
import shoppingIcon from "../../../assets/images/shopping_icon_1.svg";
import Hero_image_Africa from "../../../assets/images/search-page-header-bg.png";
import close from "../../../assets/images/search-close.svg";

/* Action */
import { getUserProfile } from "../../../utils/storage";
import { updateSearchText } from "../../../Store/reducers/searchResult";

const SearchPageHeader = (props) => {
  const [searchText, setSearchText] = useState(props.searchTextValue);
  const dispatch = useDispatch();
  const userData = getUserProfile();

  /* Trigger the API call and navigate to the UI */
  const handleOnSearch = async () => {
    console.log('API call', props);
    dispatch(updateSearchText({ text: searchText }));
    props.getSearchResult(searchText);
  };

  /* Tracks when user press enter */
  const handleOnKeyPress = (e) => {
    const key = e.keyCode || e.which;
    if (key == 13) {
      handleOnSearch();
    }
  };

  const navigateTo = (where, id) => {
    switch (where) {
      case "home":
        props.history.push(`/home`);
        break;

      case "country":
        props.history.push(`/details/${id}`);
        break;

      default:
        console.log('Need to add the logic here', where)
        break;
    }
  }

  const { countryName, countryId } = props.reducer;
  return (
    <Fragment>
      <div className="ip_header_wrap search-results-wrap" data-testid="search-results-wrap">
        <div className="ip_banner-img">
          <img src={Hero_image_Africa} />
        </div>
        <div>
          <div className="row">
            <div className="search-wrapper">
              <div className="breadcrump-admin mt-3 mb-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item" onClick={() => navigateTo('home')} >Home</li>
                    {
                      countryName &&
                      <li className="breadcrumb-item" data-testid="navBar" onClick={() => navigateTo('country', countryId)}>{countryName}</li>
                    }
                    <li className="breadcrumb-item">Search Results</li>
                  </ol>
                </nav>
              </div>

              <div className="profile-wrap">
                <UserDropdown user={userData} />
              </div>
              <div className="shopping-cart">
                <img
                  alt=""
                  src={shoppingIcon}
                  name="cart-outline"
                  className="icon"
                />
              </div>
            </div>

            <div className="quick-search">
              <input
                type="text"
                className="form-control"
                data-testid="quick-search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleOnKeyPress}
                placeholder="Ask a question, search countries, labor laws and more"
              />  
             
              <img
                alt=""
                onClick={ () => searchText ? setSearchText("") : ""}
                src={searchText ? close : searchIcon}
                name="search-outline"
                className="search-icon cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, null)(SearchPageHeader);
