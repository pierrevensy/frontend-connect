<template>
  <v-app :dark="dark">
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      dark: false
    }
  }
}
</script>
