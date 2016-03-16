import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditEpisodePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;

    return (
      <div className="profile">

      </div>
    );
  }

}

export default connect()(EditEpisodePage);

