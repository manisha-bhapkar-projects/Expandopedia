import React, { useEffect, useReducer, useState, Fragment } from "react";
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';


/* Components */
import UserDropdown from "../../Components/UserDropdown";

/* Icons */
import searchIcon from "../../assets/images/search_icon_1.svg";
import closeIcon from "../../assets/images/close.svg";
import shoppingIcon from "../../assets/images/shopping-cart-ts.svg";
import shoppingIconWhite from "../../assets/images/shopping_icon_1.svg";
import close from "../../assets/images/search-close-white.svg";

/* Action */
import { updateSearchText } from "../../Store/reducers/searchResult";
import Constants from "../../utils/constants";
import { getUserProfile, isLastLoginAttempted } from "../../utils/storage";


const SearchBar = (props) => {
    const [searchText, setSearchText] = useState('');
    const userData = getUserProfile();
    const history = useHistory();
    const dispatch = useDispatch();

    /* Trigger the API call and navigate to the UI */
    const handleOnSearch = async () => {
        if (searchText.length > 1 && !props.testCase) {
            await dispatch(updateSearchText({
                text: searchText,
                countryId: props.countryId ? props.countryId : false,
                countryName: props.countryName ? props.countryName : false,
            }));
            history.push(Constants.ROUTE.SIDEBAR.SETTINGS.SEARCH_PAGE)
        }
    };

    /* Tracks when user press enter */
    const handleOnKeyPress = (e) => {
        const key = e.keyCode || e.which;
        if (key == 13 || props.testCase) {
            handleOnSearch();
        }
    };

    return (
        <Fragment >
            <div className="search-wrapper" data-test="serachBar">
                {
                    (props.breadcrumb && props.breadcrumb.length > 0) &&
                    <div className="breadcrumb-w">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                {
                                    props.breadcrumb.map((item) => (
                                        <li key={Math.random().toString(36).substr(2, 5)} className={item.pageLink === "" ? "breadcrumb-item activeItem" : "breadcrumb-item"}>
                                            {item.pageLink !== "" ?
                                                <Link to={item.pageLink}>{item.name}</Link> :
                                                <span>{item.name}</span>
                                            }
                                        </li>
                                    ))
                                }
                                {/* <li className="breadcrumb-item">
                                    <span>Home</span>
                                </li>
                                <li className="breadcrumb-item" aria-current="page">
                                    <span>{"Country"}</span>
                                </li> */}
                            </ol>
                        </nav>
                    </div>
                }
                <div className="profile-wrap">
                    <UserDropdown user={userData} />
                </div>
                <div className="shopping-cart" data-test='shopping'>
                    {props.theme === "dark" ?
                        <img
                            alt=""
                            src={shoppingIconWhite}
                            name="cart-outline"
                            className="icon"
                        />
                        :
                        <img
                            alt=""
                            src={shoppingIcon}
                            name="cart-outline"
                            className="icon"
                        />

                    }
                </div>
            </div>
            <div className={"search-holder"} data-test="holder">
                <h3>{props.title}</h3>
                {props.doc_shop ? <p>Your one stop shop for all HR Template needs.</p> : ""}
                
                <div className="backdrop-filter">
                    <input
                        type="text"
                        className="form-control"
                        value={searchText}
                        data-testid="search-box"
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={handleOnKeyPress}
                        placeholder={`${props.doc_shop ? "Search by country or document name" : "Ask a question, search countries, labor laws and more"}`}
                    />
                      {searchText ?
                            <div onClick={() => setSearchText("")}>
                                <img
                                    alt=""
                                    src={close}
                                    name="search-outline"
                                    className="close-icon-search-knowledge cursor-pointer"
                                />
                            </div>
                           
                            : null}
                </div>
            </div>
        </Fragment>
    );
};


export default React.memo(SearchBar);
