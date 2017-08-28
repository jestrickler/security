import {SERVER_URL} from '../config';
import handleResponse from '../utils/handlers';
import 'whatwg-fetch';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function login(credentials) {
  return dispatch => {
    return fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(handleResponse)
      .then(data => {
        sessionStorage.auth = JSON.stringify(data);
        dispatch({type: LOGIN_SUCCESS, payload: data});
      })
      .catch(error => dispatch({type: LOGIN_FAILURE, payload: "Failed to login"}))
  }
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem('auth');
    dispatch({type: LOGOUT});
  }
}

