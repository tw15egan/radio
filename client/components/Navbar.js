import React from 'react';
import { IndexLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <IndexLink
            activeClassName="navbar-active"
            to="/"
          >
            <i className="material-icons">home</i>
          </IndexLink>
        </li>
        <li>
          <IndexLink
            activeClassName="navbar-active"
            to="/schedule"
          >
            <i className="material-icons">date_range</i>
          </IndexLink>
        </li>
        <li>
          <IndexLink
            activeClassName="navbar-active"
            to="/profile"
          >
            <i className="material-icons">person</i>
          </IndexLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
