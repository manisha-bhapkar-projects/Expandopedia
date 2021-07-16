import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import UserRegistrationSidebar from "../UserRegistrationLayout/UserRegistrationSidebar";

const Layout = ({ children, settings = {} }) => {
  const { isUserRegistration, sidebarSettings } = settings;
  return (
    <div className="main_wrapper position-relative" data-test="layout">
      {isUserRegistration
        ? <UserRegistrationSidebar settings={sidebarSettings} />
        : <Sidebar settings={sidebarSettings} />
      }
      <div className="common-wrapper" data-test='children'>
        {children}
      </div>
    </div>
  );
};


export default Layout;

