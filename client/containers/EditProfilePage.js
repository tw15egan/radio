import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;

    return (
      <div className="profile">
        <p>Edit Profile</p>
      </div>
    );
  }

}

export default connect()(EditProfilePage);

