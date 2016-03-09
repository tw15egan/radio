import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentShowIfNeeded } from '../actions';
import { Link } from 'react-router';
import Player from '../components/Player';
import io from 'socket.io-client';
import '../scss/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.debug = 'false';
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentShowIfNeeded());

    const socket = io.connect('/');
    socket.on('news', (data) => {
      console.log(data);
    });
  }

  render() {
    const { currentShow, children } = this.props;

    return (
      <div>
        <div className="main">
          <Player img={currentShow.items.showGif} />
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

const mapStateToProps = (state) => {
  const { currentShow } = state;

  return {
    currentShow,
  };
};

export default connect(mapStateToProps)(App);
