import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentShowIfNeeded } from '../actions';
import classNames from 'classnames';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentShowIfNeeded();
  }

  goLive(liveShow) {

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

    const tracklist = currentShow.items.tracklist.map(track => {
      const active = currentShow.items.currentSong._id === track._id;
      const trackClass = classNames({
        track: true,
        'track--active': active,
      });

      return (
        <li className={trackClass}>
          <span className="track__status">{ active ? <i className="material-icons">play_arrow</i> : ''}</span>
          <span className="track__song">{track.song}</span>
          <span className="track__artist">{track.artist}</span>
        </li>
      );
    });

    return (
        <div className="show-container">
          <div className="current-show">
            <h1>{currentShow.items.showName}</h1>
            <p>{currentShow.items.showDescription}</p>

            <ul className="tracklist">
              <li className="track track-header">
                <span className="track__status"></span>
                <span className="track__song">Song</span>
                <span className="track__artist">Artist</span>
              </li>
              {tracklist}
            </ul>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentShow } = state;

  return {
    currentShow,
  };
};

export default connect(mapStateToProps, {
  fetchCurrentShowIfNeeded,
})(HomePage);
