<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form class="mx-4" @submit.prevent="submit">
      <v-row class="mt-4">
        <v-col cols="12">
          <validation-provider v-slot="{ errors: veeErrors }">
            <v-text-field
              v-model="form.email"
              type="email"
              hide-details="auto"
              :label="$t('email')"
              :placeholder="$t('email_dots')"
              :error-messages="concatErrors(errors.email, veeErrors)"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider v-slot="{ errors: veeErrors }">
            <v-text-field
              v-model="form.password"
              type="password"
              hide-details="auto"
              :label="$t('password')"
              :placeholder="$t('password_dots')"
              :error-messages="concatErrors(errors.password, veeErrors)"
            />
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <v-btn
            type="submit"
            color="green darken-1 white--text"
            block
            large
            :disabled="invalid || saving"
            :loading="saving"
            depressed
          >
            <template v-slot:loader>
              <span>{{ $t('login_dots') }}</span>
            </template>
            {{ $t('login') }}
          </v-btn>
        </v-col>
        <v-col cols="12" class="text-right">
          <v-btn to="/forgot" nuxt text class="text-capitalize blue--text" v-text="$t('forgot_password')" />
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" app top right :color="snackbarData.color">
        {{ snackbarData.message }}
      </v-snackbar>
    </form>
  </validation-observer>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_ME, LOGIN } from '~/store/actions.type'

export default {
  data () {
    return {
      form: {},
      errors: {},
      saving: false,
      snackbar: false,
      snackbarData: {}
    }
  },
  computed: {
    ...mapGetters('user/user', ['user']),
    ...mapGetters('auth', ['authenticated'])
  },
  methods: {
    submit (e, saveAndNew) {
      this.saving = true
      this.$store
        .dispatch(`auth/${LOGIN}`, this.form)
        .then(async (v) => {
          await this.$store.dispatch(`user/user/${FETCH_ME}`)
          this.resetForm()
          if (window) { window.location.replace(this.user.is_admin ? this.$config.adminURL : this.$config.privateURL) }
        })
        .catch((e) => { this.errors = e.response.data.errors || {} })
        .finally(() => { this.saving = false })
    },
    resetForm () {
      this.form = {}
      this.$refs.observer.reset()
    },
    concatErrors (v, w) {
      return (v || []).concat((w || []).filter(e => e).map(e => this.$t(e)))
    }
  }
}
</script>
