import { FETCH_ME } from './actions.type'

// Initial state
const initialState = {}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch(`user/user/${FETCH_ME}`)
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
