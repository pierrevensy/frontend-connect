import {
  SET_ONE
} from '../mutations.type'

import {
  FETCH_ME
} from '../actions.type'

import User from '~/models/user/User'

// Initial state
const initialState = {
  user: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_ME] (context) {
    const item = await User.custom('user/users/me').$first()
    context.commit(SET_ONE, item)
    return item
  }
}

// Mutations
export const mutations = {
  [SET_ONE] (state, item) {
    state.user = item
  }
}

// Getters
export const getters = {
  user: (state) => {
    return state.user
  }
}

// Export all
export default {
  state,
  actions,
  mutations,
  getters
}
