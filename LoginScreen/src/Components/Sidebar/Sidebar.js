import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../assets/images/expando-logo.svg";
import constants from "../../utils/constants";
import { Dropdown } from "react-bootstrap";

import favourite from "../../assets/images/favorite.svg";
import countries from "../../assets/images/countries.svg";
import user from "../../assets/images/user.svg";
import user2 from "../../assets/images/user2.svg";

import usercopy from "../../assets/images/usercopy.svg";
import subscription from "../../assets/images/subscription.svg";
import purchase from "../../assets/images/purchase.svg";
import homeIcon from "../../assets/images/home.svg";
import settingsIcon from "../../assets/images/settings.svg";
import hamburgerIcon from "../../assets/images/hamburger-menu.svg";
import book from "../../assets/images/book.svg";
import chartIcon from "../../assets/images/bar-chart.svg";
import documentIcon from "../../assets/images/document-stack.svg";
import globIcon from "../../assets/images/globe.svg"
import { useSelector } from "react-redux";
import ComingSoon from "../ComingSoon";

const menuOptions = [
  {
    path: constants.ROUTE.SIDEBAR.HOME,
    icon: homeIcon,
    cName: "",
    name: "home",
  },

  {
    path: constants.ROUTE.COUNTRY.ALL_COUNTRY,
    icon: globIcon,
    cName: "",
    name: "globe", // please provide meaningful name here once page details are available
  },
  {
    path: constants.ROUTE.SIDEBAR.HOME,
    icon: chartIcon,
    cName: "stats-chart",
    name: "charts",
    comingSoon:"true"
  },
  {
    path: constants.ROUTE.KNOWLEDGE_BASE.HOME,
    icon: book,
    cName: "book-outline",
    name: "book",
  },
  {
    path: constants.ROUTE.SIDEBAR.HOME,
    icon: documentIcon,
    cName: "cart-outline",
    name: "cart",
  },
  {
    path: constants.ROUTE.SIDEBAR.HOME,
    icon: hamburgerIcon,
    cName: "",
    name: "dots-menu",
    comingSoon:"true"
  },
];

const Sidebar = ({ settings = {} }) => {
  console.log("Settings", settings);
  const history = useHistory();
  const { active } = settings;
  const userProfile = useSelector(state => state.user.userProfile)

  return (
    <div className="left_menu_wrapper" data-test="sidebar">
      <div className="logo_placer mt-4" data-test="image">
        <img src={logo} />
      </div>
      <div className="menu">
        <ul>
          {menuOptions.map((item, index) => (
            <li key={index}
            className={`${active === item.name ? "active-selected display_comingsoon relative" : "display_comingsoon relative"
          }`} >
              <NavLink key={index} to={item.path} className={`${item.cName}`}>
                <img
                  alt=""
                  src={item.icon}
                 
                />
              </NavLink>
              {item.comingSoon ? <ComingSoon direction="left"></ComingSoon> :"" }
            </li>
          ))}
          {userProfile?.roleName === "expandopedia_admin"||userProfile?.roleName === "CompanyAdmin" ?
            <li key={7} className="">
              <Dropdown drop="right">
                <Dropdown.Toggle
                  as={React.forwardRef(({ children, onClick }, ref) => (
                    <div style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      alignItems: "center"
                    }} onClick={(e) => {
                      e.preventDefault();
                      onClick(e);
                    }}
                      ref={ref} >
                      <span style={{
                        display: "inline-block",
                        width: "100%",
                        textAlign: "center"
                      }}>
                        <img
                          alt=''
                          src={settingsIcon}
                          className={`ph-gear ${active === "settings" ? "ph-house-selected" : ""
                            }`}
                        />
                      </span>
                    </div>
                  ))}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>

                <Dropdown.Menu className="super-colors submenu">
                <Dropdown.Item eventKey="1" 
                   onClick={() =>
                    history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.MY_ACCOUNT}`)
                  }>
                    <img src={user2} />
                    My Account
                  </Dropdown.Item>

                  <Dropdown.Item
                    eventKey="2"
                    onClick={() =>
                      history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.USERLIST}`)
                    }
                  >
                    <img src={usercopy} />
                    Users
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="3" onClick={() =>
                    history.push(`${constants.ROUTE.ROLES_PAGE.ROLES}`)
                  }>
                    <img src={user} />
                    Roles &amp; Permissions
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="4" onClick={() =>
                    history.push(`${constants.ROUTE.SUBSCRIPTION_PAGE.ALL}`)
                  }>
                    <img src={subscription} />
                    Subscription
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="5" 
                      onClick={() =>
                        history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.FAVORITE_COUNTRIES}`)
                      }>
                    <img src={favourite} />
                    Favorite Countries
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="6" href={"/"}>
                    <img src={purchase} />
                    Purchases & Expert Briefs
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="6" href={'#'+constants.ROUTE.SIDEBAR.SETTINGS.COUNTRY_CONFIGURATION}>
                    <img src={countries} />
                    Countries
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
