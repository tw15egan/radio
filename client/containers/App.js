import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Player from '../components/Player';
import '../scss/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/api/sample/currentShow')
      .then(data => {
        console.log(data);
      });
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

export default App;
