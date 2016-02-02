import fetch from 'isomorphic-fetch';

export const REQUEST_CURRENT_SHOW = 'REQUEST_CURRENT_SHOW';
export const RECEIVE_CURRENT_SHOW = 'RECEIVE_CURRENT_SHOW';
export const INVALIDATE_CURRENT_SHOW = 'INVALIDATE_CURRENT_SHOW';

export function invalidateCurrentShow(currentShow) {
  return {
    type: INVALIDATE_CURRENT_SHOW,
    currentShow,
  };
}

function requestCurrentShow(currentShow) {
  return {
    type: REQUEST_CURRENT_SHOW,
    currentShow,
  };
}

function receiveCurrentShow(currentShow, json) {
  return {
    type: RECEIVE_CURRENT_SHOW,
    currentShow,
  };
}
