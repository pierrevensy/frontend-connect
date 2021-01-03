import {
  SET_TOKEN,
  SET_AUTHENTICATED
} from './mutations.type'
import {
  LOGOUT
} from './actions.type'

// Initial state
const initialState = {
  token: null,
  authenticated: true
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  [LOGOUT] ({ commit }) {
    commit(SET_TOKEN, null)
    this.$cookies.remove('token')
    this.$axios.setToken(null, 'Bearer')
    commit(SET_AUTHENTICATED, false)
  }
}

// Mutations
export const mutations = {
  [SET_TOKEN] (state, v) {
    state.token = v
  },
  [SET_AUTHENTICATED] (state, v) {
    state.authenticated = v
  }
}

// Getters
const getters = {
  token: (state) => {
    return state.token
  },
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
