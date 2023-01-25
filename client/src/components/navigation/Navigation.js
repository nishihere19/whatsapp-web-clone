import "./Navigation.css";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Cookies from "universal-cookie";

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
        <button className='Rbutton' onClick={LogoutUser}>
          <i className='fa-solid fa-right-from-bracket'></i>
        </button>
      </div>
    </div>
  );
}
