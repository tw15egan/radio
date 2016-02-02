import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './containers/App';

// because I don't feel like making an index.html file
document.body.innerHTML = '<div id="radio"></div>';
const radio = document.getElementById('radio');

render(<App />, radio);
