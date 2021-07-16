import React, { useState } from 'react';
import profile_img from "../../assets/images/dp.jpeg";
import constants from '../../utils/constants';
import { Dropdown } from "react-bootstrap"
import { logOutUser } from '../../utils/storage';
import { useHistory } from 'react-router';
import UserService from "../../services/UserService"
import searchIcon from "../../assets/images/search_icon_1.svg";
import shoppingIcon from "../../assets/images/shopingCartBlack.svg";
import UserDropdown from '../../Components/UserDropdown';
import layoutTextWindow from "../../assets/images/layout-text-window.svg";
import gridOutLine from "../../assets/images/grid-outline.svg";
import SearchBar from "../../Components/SearchBar";

import ComparePopup from "../CountryCompare/ComparePopup";

const HeaderText = (props) => {
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false)
  const [popRender, setPopRender] = useState(false)

  return (
    <>
      <SearchBar user={props.userData} placeholder="Search for a country or ask a question" />
      <div className="row" data-test='headerText'>
        <div className="header_wrapper col-12">
          {props.hideTitle ? null : (<h2 className="header-28">ALL COUNTRIES</h2>)}
          <div className="layout_ctrl">
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setPopRender(true)
                setShowDialog(true)
              }}
            >Compare Countries</button>
            <span style={{ display: "none" }}></span>
            {popRender &&
              <ComparePopup show={showDialog} onHide={() => {
                setPopRender(false)
                setShowDialog(false)
              }} />}
            <span className="document-text-outline">
              {/* <ion-icon name="document-text-outline" /> */}
              <img alt='' src={layoutTextWindow} name="layout-window" className="" />
            </span>
            <span href className="active">
              <img alt='' src={gridOutLine} name="grid-outline" className="" />
            </span>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HeaderText;