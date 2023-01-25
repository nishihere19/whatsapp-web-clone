import "./Navigation.css";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navigation() {
  const LogoutUser = () => {
    const cookie = new Cookies();
    cookie.remove("token", { path: "/" });
    window.location = "/login";
  };

  return (
    <div className='navigation-section'>
      <AccountCircleIcon className='icon-clickable profile-picture' />
      <div className='actions'>
        {/* <MoreVertIcon className='icon-clickable' onClick={LogoutUser} /> */}
        <button className='Rbutton' onClick={LogoutUser}>
          <i className='fa-solid fa-right-from-bracket'></i>
        </button>
        {/* <FontAwesomeIcon icon='fa-regular fa-arrow-right-from-bracket' /> */}
      </div>
    </div>
  );
}
