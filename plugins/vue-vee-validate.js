import Vue from 'vue'
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'form_required_field_error'
})

Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
