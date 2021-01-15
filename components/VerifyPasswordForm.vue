<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form class="mx-4" @submit.prevent="submit">
      <v-row class="mt-4">
        <v-col cols="12">
          <v-alert color="info white--text" class="text-center" dense>
            {{ $t('verify_email_desc_1') }}
          </v-alert>
          <p class="text-disable text-center" v-text="$t('verify_email_desc_2')" />
          <p class="text-disable text-center mb-0" v-text="$t('verify_email_desc_3')" />
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
              <span v-text="$t('send_dots')" />
            </template>
            {{ $t('click_request_another') }}
          </v-btn>
        </v-col>
        <v-col cols="12" class="text-right">
          <v-btn to="/" nuxt text class="text-capitalize blue--text">
            {{ $t('back_to_login') }}
          </v-btn>
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
import { SAVE } from '~/store/actions.type'

export default {
  props: {
    entity: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      errors: {},
      saving: false,
      snackbar: false,
      snackbarData: {},
      form: { ...this.entity },
      backLink: this.entity.id ? `/group/groups/${this.entity.id}` : '/group?tab=groups'
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated'])
  },
  methods: {
    submit (e, saveAndNew) {
      this.saving = true
      this.$store
        .dispatch(`group/group/${SAVE}`, this.form)
        .then((v) => {
          this.resetForm()
          this.showSnackbar('success', this.$t('item_saved_message'))
          if (!saveAndNew) { this.$router.push(`/group/groups/${v.id}`) }
        })
        .catch((e) => { this.errors = e.response.data.errors || {} })
        .finally(() => { this.saving = false })
    },
    showSnackbar (color, message) {
      this.snackbar = true
      this.snackbarData.color = color
      this.snackbarData.message = message
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
