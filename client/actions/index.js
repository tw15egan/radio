import fetch from 'isomorphic-fetch';

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
    data: json.data.children.map(child => {
      return child.data;
    }),
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
