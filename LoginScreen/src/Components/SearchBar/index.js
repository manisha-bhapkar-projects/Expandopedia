import React, { useEffect, useReducer, useState, Fragment } from "react";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


/* Components */
import UserDropdown from "../../Components/UserDropdown";

/* Icons */
import searchIcon from "../../assets/images/search_icon_1.svg";
import shoppingIcon from "../../assets/images/shopping-cart-ts.svg";
import shoppingIconWhite from "../../assets/images/shopping_icon_1.svg";
import close from "../../assets/images/search-close.svg";
import closeWhite from "../../assets/images/search-close-white.svg";


/* Action */
import { updateSearchText } from "../../Store/reducers/searchResult";
import Constants from "../../utils/constants";
import { getUserProfile, isLastLoginAttempted } from "../../utils/storage";


const SearchBar = (props) => {
    const [searchText, setSearchText] = useState('');
    const userData = useSelector((state) => state?.user?.userProfile);
    const history = useHistory();
    const dispatch = useDispatch();

    /* Trigger the API call and navigate to the UI */
    const handleOnSearch = async () => {
        console.log('API call', props);
        if (searchText.length > 1) {
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
        if (key == 13) {
            handleOnSearch();
        }
    };

    return (
        <Fragment>
            <div className={props.noRow ? "full-width" : "row"}>
                <div className="search-wrapper">
                    <div className="backdrop-filter">
                        <input
                            type="text"
                            className="form-control"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={handleOnKeyPress}
                            placeholder={props.placeholder ? props.placeholder : "Ask a question"}
                        />
                        {/* <i className="ph-magnifying-glass" /> */}
                        {searchText ?
                            <div onClick={() => setSearchText("")}>
                                {props.theme === "dark" ?

                                    <img
                                        alt=""
                                        src={closeWhite}
                                        name="search-outline"
                                        className="close-icon-search-knowledge cursor-pointer"
                                    />
                                    :
                                    <img
                                        alt=""
                                        src={close}
                                        name="search-outline"
                                        className="close-icon-search cursor-pointer"
                                    />  }                          
                                    </div>

                            : null}
                    </div>
                    {/* <img
                        alt=""
                        src={searchIcon}
                        name="search-outline"
                        className="search-icon"
                    /> */}
                    <div className="profile-wrap">
                        <UserDropdown user={userData} />
                    </div>
                    <div className="shopping-cart">
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
            </div>
        </Fragment>
    );
};


export default React.memo(SearchBar);
