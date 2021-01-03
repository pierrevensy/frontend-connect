<template>
  <page-layout :title="$t('forgot_password')">
    <forgot-password-form />
  </page-layout>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('forgot_password'),
      meta: [
        { hid: 'og:title', content: this.$t('forgot_password') },
        { hid: 'og:url', content: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>
