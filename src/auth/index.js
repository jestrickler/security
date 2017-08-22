import {SERVER_URL} from '../config';
import handleResponse from '../handlers';
import headers from '../auth/headers';
import 'whatwg-fetch';
import qs from 'qs';

const handleAuth = (response) => {
  sessionStorage.auth = JSON.stringify(response)
};

export default {

  logOut() {
    sessionStorage.removeItem('auth');
  },

  logIn(credentials) {
    return fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(handleResponse)
      .then(handleAuth)
      .catch(() => { throw new Error("Unable to login!")})
  },

  refreshToken() {
    return fetch(`${SERVER_URL}/oauth/access_token`,
      { method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(sessionStorage.auth).refresh_token
        })
      }).then(handleResponse)
        .then(handleAuth)
        .catch(() => { throw new Error("Unable to refresh!")})
  },

  loggedIn() {
    return sessionStorage.auth &&
      fetch(
        `${SERVER_URL}/api/user`,
        {headers: headers()})
        .then(handleResponse)
        .then(() => { return true })
        .catch(this.refreshToken)
        .catch(() => { return false });
  }
};