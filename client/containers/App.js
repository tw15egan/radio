import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PlayerPage from './PlayerPage';
import io from 'socket.io-client';
import { fetchCurrentShowIfNeeded } from '../actions';
import '../scss/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.debug = 'false';
  }

  componentDidMount() {

    const socket = io.connect('/');
    socket.on('news', (data) => {
      console.log(data);
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className="main">
          <div className="content-container">
            {children}
          </div>
          <div className="player-container">
            <PlayerPage />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default connect()(App);


