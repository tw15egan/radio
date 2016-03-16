import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileSidebar from '../components/ProfileSidebar';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;

    return (
      <div className="profile">
        <div className="profile__sidebar">
          <ProfileSidebar />
        </div>
        <div className="profile__main">
          {children}
        </div>
      </div>
    );
  }

}

export default connect()(ProfilePage);

