import merge from 'lodash.merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  REQUEST_CURRENT_SHOW, RECEIVE_CURRENT_SHOW, INVALIDATE_CURRENT_SHOW
} from '../actions';

const userReducer = (state = {
  isFetching: false,
  user: [],
}, action) => {
  switch (action.type) {
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
      return merge({}, state, {
        didInvalidate: true,
      });
    }
    case REQUEST_CURRENT_SHOW: {
      return merge({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    }
    case RECEIVE_CURRENT_SHOW: {
      return merge({}, state, {
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

const rootReducer = combineReducers({
  currentShow,
  routing,
});

export default rootReducer;
