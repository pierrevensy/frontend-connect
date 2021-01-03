<template>
  <page-layout :title="$t('connect')">
    <login-form />
  </page-layout>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('login'),
      meta: [
        { hid: 'og:title', content: this.$t('login') },
        { hid: 'og:url', content: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>
