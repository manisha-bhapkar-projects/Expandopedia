import React from 'react';
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

const HeaderText = (props) => {

  const history = useHistory()

  return (
    <>
      <SearchBar user={props.userData} />
      <div className="row" data-test='headerText'>
        <div className="header_wrapper col-12">
           {props.hideTitle ?  null :(<h2 className="header-28">My Countries</h2>)}
          <div className="layout_ctrl">
            <a href="#" >
            <img alt='' src={layoutTextWindow} name="tabel-view" />
            </a>
            {/* <a href="#" style={{display: "none"}}></a> */}
            <a className="active">
              {/* <ion-icon name="document-text-outline" /> */}
              <img alt='' src={gridOutLine} name="layout-window" />
            </a>
            {/* <a href="#" className="active">
              <img alt='' src={gridOutLine} name="grid-outline" className="" />
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderText;