import React from "react";
import "../../styles/Header.css";

import GDriveLogo from "../../media/google-drive-logo.png";

import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";

const index = ({ userPhoto }) => {
  const handleAuthenticaton = () => {
    const response = window.confirm("Do you want to Sign Out?");
    if (response) {
      window.location.reload();
    }
  };
  return (
    <div className="header">
      <div className="header__logo">
        <img src={GDriveLogo} alt="Google Drive" />
        <span>Drive</span>
      </div>
      <div className="header__searchContainer">
        <div className="header__searchBar">
          <SearchIcon />
          <input type="text" placeholder="Search in Drive" />
          <ExpandMoreIcon />
        </div>
      </div>
      <div className="header__icons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <AppsIcon />
        <img
          style={{ cursor: "pointer" }}
          title="Click to Sign Out"
          onClick={handleAuthenticaton}
          src={userPhoto}
          alt="User Photo"
        />
      </div>
    </div>
  );
};

export default index;
