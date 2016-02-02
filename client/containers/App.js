import React, { Component } from 'react';
import Player from '../components/Player';
import Navbar from '../components/Navbar';


class App extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <div className="sidebar">
            <Player />
          </div>
          <div className="content">
            <h1>Hello there my name is bob</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
