import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // Nuxt config (https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config#runtimeconfig)
  get $config () {
    return BaseModel.$config
  }

  // Base url
  baseURL () {
    return this.$config.apiURL
  }

  // implement a default request method
  request (config) {
    return this.$http.request(config)
  }

  // Build query
  buildQuery (payload) {
    return this.page(parseInt(payload.page || 1))
      .limit(parseInt(payload.limit || 30))
      .setFilters(payload.filter)
      .setSorts(payload.sort)
  }

  // Set filters
  setFilters (values) {
    const items = values || []
    for (const key in items) {
      this.where(key, items[key])
    }
    return this
  }

  // Set sorts
  setSorts (value) {
    return this.orderBy(value)
  }

  // Override create
  _create () {
    if (this.image || this.file) { this.is_published = this.is_published ? 1 : 0 }
    return this.request(
      this._reqConfig({
        method: 'POST',
        url: this.endpoint(),
        data: this
      }, { forceMethod: true })
    ).then((response) => {
      return this._applyInstance(response.data.data || response.data)
    })
  }

  // Override update
  _update () {
    const config = this._reqConfig({
      method: !this.image && !this.file ? 'PUT' : 'POST',
      url: this.endpoint(),
      data: this
    })
    if (this.image || this.file) {
      config.data.set('_method', 'PUT')
      config.data.set('is_published', this.is_published ? 1 : 0)
    }
    return this.request(config).then(res => this._applyInstance(res.data.data || res.data))
  }
}
