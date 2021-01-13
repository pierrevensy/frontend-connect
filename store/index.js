import { FETCH_ME } from './actions.type'
import { SET_AUTHENTICATED } from './mutations.type'

// Initial state
const initialState = {}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async nuxtServerInit ({ dispatch, commit }) {
    try {
      await dispatch(`user/user/${FETCH_ME}`)
      commit(`auth/${SET_AUTHENTICATED}`, true)
    } catch (e) {}
  }
}

// Mutations
export const mutations = {}

// Getters
const getters = {}

// Export all
export default {
  state,
  actions,
  mutations,
  getters
}
