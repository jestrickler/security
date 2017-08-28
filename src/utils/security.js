import jwt_decode from 'jwt-decode';
import {SERVER_URL} from '../config';
import handleResponse from './handlers';
import 'whatwg-fetch';
import qs from 'qs';


export default function securedFetch(url, options) {
  return headers().then(headers => {
    return fetch(url, {...options, headers})
  });
}

function headers() {
  return checkToken().then(() => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.auth ? JSON.parse(sessionStorage.auth).access_token : null}`
    };
  });
}

async function checkToken() {
  if (sessionStorage.auth) {
    const decoded = jwt_decode(JSON.parse(sessionStorage.auth).access_token);
    const now = new Date().getTime() / 1000;
    if(decoded.exp < now) {
      await refreshToken();
    }
  }
}

function refreshToken() {
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
      .then(data => {
        sessionStorage.auth = JSON.stringify(data)
      })
      .catch(() => { throw new Error("Unable to refresh!")})
}
