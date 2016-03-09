import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
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
  const show = state.show;

  if (!show) {
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

    return Promise.resolve();
  };
}

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA'

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

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
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
    return fetch('/auth/getToken/', {
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
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      try {
        let decoded = jwtDecode(response.token);
        dispatch(loginUserSuccess(response.token));
        dispatch(browserHistory.push(redirect));
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
