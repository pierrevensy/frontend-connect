export default function ({ store, app: { $axios, $cookies }, redirect, error }) {
  // Set token if exists

  // Error handler
  $axios.onError((err) => { // Set error interceptors
    const code = parseInt((err.response || {}).status)
    // const errors = { 401: 'Not authenticated', 403: 'Forbidden', 404: 'Not found' }
    if ([401, 403, 404].includes(code)) {
      // error({ statusCode: code, message: errors[code] })
    } else {
      // error({ statusCode: 0, message: 'Error occured' })
    }
  })
}
