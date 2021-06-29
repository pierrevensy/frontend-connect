<template>
  <v-container class="mt-12">
    <v-row>
      <v-col cols="4" offset="4">
        <v-card color="primary" dark>
          <v-card-text>
            <p class="mb-2 pt-1" v-text="$t('logout')" />
            <v-progress-linear indeterminate color="white" class="mb-0" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LOGOUT } from '~/store/actions.type'

export default {
  mounted () {
    this.$store.dispatch(`auth/${LOGOUT}`).finally(() => {
      console.log('logged out')
      if (window) { window.location.replace(this.$config.baseURL) }
    })
  },
  layout: 'empty'
  // middleware: ['auth']
}
</script>
