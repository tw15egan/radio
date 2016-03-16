import React from 'react';
import { Link } from 'react-router';

const ProfileSidebar = () => {
  return (
    <div className="profile-navbar">
      <div className="profile-navbar__item">
        <Link
          activeClassName="profile-navbar--active"
          to="/profile"
        >
          <p>Login</p>
        </Link>
      </div>
      <div className="profile-navbar__item">
        <Link
          activeClassName="profile-navbar--active"
          to="/editprofile"
        >
          <p>Profile</p>
        </Link>
      </div>
      <div className="profile-navbar__item">
        <Link
          activeClassName="profile-navbar--active"
          to="/editshow"
        >
          <p>Show</p>
        </Link>
      </div>
      <div className="profile-navbar__item">
        <Link
          activeClassName="profile-navbar--active"
          to="/addshow"
        >
          <p>Add Show</p>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
