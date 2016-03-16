import React, { Component } from 'react';
import { connect } from 'react-redux';

// Edit show name
// Edit show description
// edit show time
// Get list of episodes

class EditShowPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;

    return (
      <div className="profile">
        <p>Edit Show Page</p>
      </div>
    );
  }

}

export default connect()(EditShowPage);

