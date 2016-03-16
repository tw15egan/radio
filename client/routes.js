import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SchedulePage from './containers/SchedulePage';
import ProfilePage from './containers/ProfilePage';
import LoginPage from './containers/LoginPage';
import EditProfilePage from './containers/EditProfilePage';
import EditShowPage from './containers/EditShowPage';
import AddShowPage from './containers/AddShowPage';
import RegisterPage from './containers/RegisterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/schedule" component={SchedulePage} />
    <Route path="/profile" component={ProfilePage} >
      <IndexRoute component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/editprofile" component={EditProfilePage} />
      <Route path="/editshow" component={EditShowPage} />
      <Route path="/addshow" component={AddShowPage} />
    </Route>
  </Route>
);
