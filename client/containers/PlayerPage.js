import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { fetchCurrentShowIfNeeded } from '../actions';

class PlayerPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentShowIfNeeded();
  }

  render() {
    const { currentShow } = this.props;
    const isEmpty = currentShow.items.length === 0;

    if (isEmpty) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    const audioUrl = 'http://bluecast-master.rtp.raleigh.ibm.com:8000/bluecast_128.mp3';
    const test = 'http://192.99.10.37:8000/;?icy=http';

    return (
      <div className="player">
        <Navbar />

        <div className="gif">
          <div className="gif__container">
            <img className="gif__element" src={currentShow.items.showGif} />
          </div>
        </div>

        <div className="song">
          <h1 className="song__title">{currentShow.items.currentSong.song}</h1>
          <h2 className="song__artist">{currentShow.items.currentSong.artist}</h2>
        </div>

        <audio
          id="radioplayer"
          className="radio-element"
          preload="meta"
          controls
          src={test}
        >
          Your browser does not support the audio element.
        </audio>

      </div>
    );
  }
}

PlayerPage.PropTypes = {
  currentShow: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { currentShow } = state;

  return {
    currentShow,
  };
};

export default connect(mapStateToProps, {
  fetchCurrentShowIfNeeded,
})(PlayerPage);

