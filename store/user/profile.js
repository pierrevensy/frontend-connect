import { serialize } from 'object-to-formdata'
import {
  SET_ME,
  SET_ONE,
  SET_MANY,
  SET_META
} from '../mutations.type'
import {
  SAVE,
  DELETE,
  FILTER,
  SAVE_ME,
  FETCH_ME,
  FETCH_ONE,
  FETCH_MANY,
  DELETE_MANY
} from '../actions.type'
import Profile from '~/models/user/Profile'

// Initial state
const initialState = {
  meta: {},
  profile: {},
  profiles: [],
  authProfile: {}
}

// States
export const state = () => ({ ...initialState })

// Actions
export const actions = {
  async [FETCH_MANY] (context, payload = {}) {
    const builder = new Profile()
    const res = await builder.buildQuery(payload).get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [FETCH_ONE] (context, slug) {
    const item = await Profile.$find(slug)
    context.commit(SET_ONE, item)
    return item
  },
  async [FETCH_ME] (context) {
    const item = await Profile.custom('user/profiles/me').$first()
    context.commit(SET_ME, item)
    return item
  },
  async [FILTER] (context, payload = {}) {
    const builder = new Profile()
    const res = await builder.buildQuery(payload).custom('user/profiles/filter').get()
    context.commit(SET_META, res.meta)
    context.commit(SET_MANY, res.data)
    return res.data
  },
  async [SAVE] (context, payload) {
    const model = new Profile(payload)
    return await model.save()
  },
  async [SAVE_ME] (context, payload) {
    payload._method = 'PUT'
    return await this.$axios.post('user/profiles/me', serialize(payload), { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  async [DELETE] (context, payload) {
    const model = new Profile(payload)
    return await model.delete()
  },
  async [DELETE_MANY] (context, payload) {
    return await this.$axios.delete(`user/profiles/delete-many?ids=${payload.items.join(',')}`)
  }
}

// Mutations
export const mutations = {
  [SET_ONE] (state, v) {
    state.profile = v
  },
  [SET_MANY] (state, v) {
    state.profiles = v
  },
  [SET_META] (state, v) {
    state.meta = v
  },
  [SET_ME] (state, v) {
    state.authProfile = v
  }
}

// Getters
const getters = {
  meta: (state) => {
    return state.meta
  },
  profile: (state) => {
    return state.profile
  },
  authProfile: (state) => {
    return state.authProfile
  },
  profiles: (state) => {
    return state.profiles
  }
}

// Export all
export default {
  state,
  actions,
  mutations,
  getters
}
