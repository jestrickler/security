import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {...state, user: action.payload, isAuthenticated: true}
    }
    case LOGIN_FAILURE: {
      return {...state, error: action.payload}
    }
    case LOGOUT: {
      return initialState
    }
    default: {
      return state
    }
  }
}