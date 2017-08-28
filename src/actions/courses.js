import {SERVER_URL} from '../config';
import securedFetch from '../utils/security';
import handleResponse from '../utils/handlers';

export const FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';

export function fetchCourses() {
  return dispatch => {
    dispatch({type:FETCH_COURSES_REQUEST});
    return securedFetch(`${SERVER_URL}/api/course`)
      .then(handleResponse)
      .then(data => dispatch({type:FETCH_COURSES_SUCCESS, payload: data}))
      .catch(error => dispatch({type:FETCH_COURSES_FAILURE, payload: "Failed to load courses"}))
  }
}
