export default function ({ store, redirect, app }) {
  // If the user is not authenticated
  if (!store.state.auth.authenticated) {
    return redirect(app.$config.baseURL)
  }
}
