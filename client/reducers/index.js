import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  REQUEST_CURRENT_SHOW, RECEIVE_CURRENT_SHOW, INVALIDATE_CURRENT_SHOW,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,
} from '../actions';

import jwtDecode from 'jwt-decode';

const createUser = (state = {
  isFetching: false,
}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case CREATE_USER_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    }
    default:
      return state;
  }
};

const currentShow = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_CURRENT_SHOW: {
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    }
    case REQUEST_CURRENT_SHOW: {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    }
    case RECEIVE_CURRENT_SHOW: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt,
      });
    }
    default:
      return state;
  }
};

// LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,

const auth = (state = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null,
      });
    }
    case LOGIN_USER_SUCCESS: {
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        email: jwtDecode(action.payload.token).email,
        statusText: 'You have logged in',
      });
    }
    case LOGIN_USER_FAILURE: {
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        email: null,
        statusText: `Auth error: ${action.payload.status} $`,
      });
    }
    case LOGOUT_USER: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        email: null,
        statusText: 'You have logged out',
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth,
  createUser,
  currentShow,
  routing,
});

export default rootReducer;
