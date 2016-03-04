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

const currentShowReducer = (state = {
  currentShow: {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
}, action) => {
  switch (action.type) {
    case INVALIDATE_CURRENT_SHOW: {
      return merge({}, state, {
        currentShow: {
          didInvalidate: true,
        },
      });
    }
    case REQUEST_CURRENT_SHOW: {
      return merge({}, state, {
        currentShow: {
          isFetching: true,
          didInvalidate: false,
        },
      });
    }
    case RECEIVE_CURRENT_SHOW: {
      return merge({}, state, {
        currentShow: {
          isFetching: false,
          didInvalidate: false,
          items: action.currentShow,
          lastUpdated: action.receivedAt,
        },
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentShowReducer,
  routing,
});

export default rootReducer;
