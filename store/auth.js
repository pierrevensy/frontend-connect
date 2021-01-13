import {
  SET_AUTHENTICATED
} from './mutations.type'
import {
  LOGIN
} from './actions.type'

// Initial state
const initialState = {
  authenticated: false
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [LOGIN] (context, payload) {
    const res = await this.$axios.$post('/token', { ...payload, device_name: 'frontend' })
    this.$axios.setToken(res, 'Bearer')
    context.commit(SET_AUTHENTICATED, true)
    this.$cookies.set('token', res, { sameSite: 'Lax', path: '/' })
    return res
  }
}

// Mutations
export const mutations = {
  [SET_AUTHENTICATED] (state, v) {
    state.authenticated = v
  }
}

// Getters
const getters = {
  authenticated: (state) => {
    return state.authenticated
  }
}

// Export all
export default {
  state,
  actions,
  mutations,
  getters
}
