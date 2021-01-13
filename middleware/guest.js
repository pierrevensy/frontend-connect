export default function ({ store, redirect, app }) {
  if (store.state.auth.authenticated) { // If the user is authenticated
    return redirect(store.state.user.user.user.is_admin ? app.$config.adminURL : app.$config.privateURL)
  }
}
