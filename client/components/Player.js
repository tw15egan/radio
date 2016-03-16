import React from 'react';

const Player = (props) => {
  return (
    <div className="player">
      <audio
        className="radio-element"
        preload="none"
        src="http://bluecast-master.rtp.raleigh.ibm.com:8000/bluecast_128.mp3"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
