import fetch from 'isomorphic-fetch';
import { parseJSON } from '../utils';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

export const REQUEST_CURRENT_SHOW = 'REQUEST_CURRENT_SHOW';
export const RECEIVE_CURRENT_SHOW = 'RECEIVE_CURRENT_SHOW';
export const INVALIDATE_CURRENT_SHOW = 'INVALIDATE_CURRENT_SHOW';

export function invalidateCurrentShow() {
  return {
    type: INVALIDATE_CURRENT_SHOW,
  };
}

export function requestCurrentShow() {
  return {
    type: REQUEST_CURRENT_SHOW,
  };
}

export function receiveCurrentShow(json) {
  return {
    type: RECEIVE_CURRENT_SHOW,
    data: json,
    receivedAt: Date.now(),
  };
}

export function fetchCurrentShow() {

  return dispatch => {
    dispatch(requestCurrentShow());
    return fetch('/api/sample/currentShow')
      .then(res => {
        return res.json();
      })
      .then(json => {
        return dispatch(receiveCurrentShow(json));
      });
  };
}

function shouldFetchCurrentShow(state) {
  const show = state.currentShow;

  if (!show.items.showName) {
    return true;
  }

  if (show.isFetching) {
    return false;
  }

  return show.didInvalidate;
}

export function fetchCurrentShowIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCurrentShow(getState())) {
      return dispatch(fetchCurrentShow());
    }
  };
}

export const ADD_SHOW = 'ADD_SHOW';
export const SUBMITTING_SHOW = 'SUBMITTING_SHOW';
export function addShow(showDetails) {
  return dispatch => {
    return fetch('/api/show/add', {
      method: 'post',
      body: new FormData(showDetails),
    });
  };
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export function createUserRequest() {
  return {
    type: CREATE_USER_REQUEST,
  };
}

export function createUserSuccess(json) {
  return {
    type: CREATE_USER_SUCCESS,
    message: json,
  };
}

export function createUser(email, password) {
  return dispatch => {
    dispatch(createUserRequest());

    return fetch('/api/user/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(json => {
      dispatch(createUserSuccess(json));
      browserHistory.push('/profile');
    });
  };
}

export function postCreateUser(email, password) {
  return (dispatch, getState) => {
    return dispatch(createUser(email, password));
  };
}

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA'

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}



export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(browserHistory('/login'));
  };
}

export function loginUser(email, password, redirect = '/') {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return fetch('/api/user/auth/', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(parseJSON)
    .then(response => {
      try {
        dispatch(loginUserSuccess(response.token));
        browserHistory.push(redirect);
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token',
          },
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    });
  };
}

export function receiveProtectedData(data) {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data,
    },
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest());
    return fetch('http://localhost:3000/getData/', {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveProtectedData(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(loginUserFailure(error));
        dispatch(browserHistory.push('/login'));
      }
    });
  };
}
