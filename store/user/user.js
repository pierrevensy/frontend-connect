
import {
  SET_ME,
  SET_ONE,
  SET_MANY,
  SET_META,
  SET_ENABLED
} from '../mutations.type'

import {
  SAVE,
  DELETE,
  FILTER,
  FETCH_ME,
  FETCH_ONE,
  FETCH_MANY,
  DELETE_MANY,
  TOGGLE_ENABLED,
  DISABLE_ACCOUNT,
  CHANGE_PASSWORD,
  SAVE_ME
} from '../actions.type'

import User from '~/models/user/User'

// Initial state
const initialState = {
  user: {},
  meta: {},
  users: [],
  authUser: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_MANY] (context, payload = {}) {
    const builder = new User()
    const res = await builder.buildQuery(payload).get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [FETCH_ONE] (context, slug, prevItem) {
    const item = await User.$find(slug)
    context.commit(SET_ONE, item)
    return item
  },
  async [FETCH_ME] (context) {
    const item = await User.custom('user/users/me').$first()
    context.commit(SET_ME, item)
    return item
  },
  async [FILTER] (context, payload = {}) {
    const builder = new User()
    const res = await builder.buildQuery(payload).custom('user/users/filter').get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [SAVE] (context, payload) {
    return await (new User(payload)).save()
  },
  async [SAVE_ME] (context, payload) {
    return await this.$axios.put('user/users/me', payload)
  },
  async [DELETE] (context, payload) {
    return await (new User(payload)).delete()
  },
  async [CHANGE_PASSWORD] (context, payload) {
    return await this.$axios.put('user/users/me/change-password', payload)
  },
  async [DISABLE_ACCOUNT] (context, payload) {
    return await this.$axios.put('user/users/me/disable-account', payload)
  },
  async [TOGGLE_ENABLED] (context, payload) {
    const res = await this.$axios.put('user/users/toggle-enabled', payload)
    if (payload.unique) { context.commit(SET_ENABLED, payload.enabled) }
    return res
  },
  async [DELETE_MANY] (context, payload) {
    return await this.$axios.delete(`user/users/delete-many?ids=${payload.items.join(',')}`)
  }
}

// Mutations
export const mutations = {
  [SET_MANY] (state, items) {
    state.users = items
  },
  [SET_ONE] (state, item) {
    state.user = item
  },
  [SET_ME] (state, item) {
    state.authUser = item
  },
  [SET_META] (state, item) {
    state.meta = item
  },
  [SET_ENABLED] (state, v) {
    state.author.is_published = v
  }
}

// Getters
export const getters = {
  users: (state) => {
    return state.users
  },
  user: (state) => {
    return state.user
  },
  authUser: (state) => {
    return state.authUser
  },
  meta: (state) => {
    return state.meta
  }
}

// Export all
export default {
  state,
  actions,
  mutations,
  getters
}
