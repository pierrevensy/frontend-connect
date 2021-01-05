import {
  SET_AUTHENTICATED
} from './mutations.type'
import {
  LOGIN
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
  async [LOGIN] (context, payload) {
    const res = await this.$axios.post('/login', payload)
    context.commit(SET_AUTHENTICATED, true)
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
