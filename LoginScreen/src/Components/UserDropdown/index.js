import React from "react";
import { Dropdown } from "react-bootstrap";
import constants from "../../utils/constants";
import profile_img from "../../assets/images/dp.jpeg";
import { useHistory } from "react-router-dom";

export default function UserDropdown(props) {
  const history = useHistory();

  const onDropdownSelect = (eventKey) => {
    if (eventKey === "logout") {
      window.location.href = localStorage.getItem("logout_url");
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  return (
    <Dropdown onSelect={onDropdownSelect}>
      <Dropdown.Toggle
        as={React.forwardRef(({ onClick }, ref) => (
          <img
            id="dropdown-custom-components"
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
            src={
              props?.user?.imageUrl
                ? `${constants.IMAGE.DOWNLOAD}${props?.user?.imageUrl}`
                : profile_img
            }
          />
        ))}
      />
      <Dropdown.Menu className="dropDown-container">
        <Dropdown.Item
          className="dropDown-child"
          eventKey="1"
          onClick={() =>
            history.push(`${constants.ROUTE.SIDEBAR.SETTINGS.MY_ACCOUNT}`)
          }
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item className="dropDown-child" eventKey="">
          Change Password
        </Dropdown.Item>
        <Dropdown.Item className="dropDown-child" eventKey="logout">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
