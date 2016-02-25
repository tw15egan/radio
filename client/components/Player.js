import React from 'react';

const Player = (props) => {
  return (
    <div className="player">
      <img className="player__gif" src={props.img} />
      <h1 className="player__title">Player</h1>
    </div>
  );
};

Player.propTypes = {
  img: React.PropTypes.string.isRequired,
};

export default Player;
