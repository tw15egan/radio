import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentShowIfNeeded, invalidateCurrentShow } from '../actions';
import { Link } from 'react-router';
import Player from '../components/Player';
import '../scss/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrentShowIfNeeded());
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className="main">
          <Player img="http://i.imgur.com/WMGE9RL.gif" />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
          </ul>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

// const mapStateToProps = (state) => {
//   const {
//     currentShow: {
//       isFetching,
//       lastUpdated,
//     }
//     isFetching,
//     lastUp
//   }
// };

export default connect()(App);
