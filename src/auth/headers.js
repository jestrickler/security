export default () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.auth ? JSON.parse(sessionStorage.auth).access_token : null}`
  }
}