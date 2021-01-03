<template>
  <page-layout :title="$t('reset_password')">
    <reset-password-form />
  </page-layout>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('reset_password'),
      meta: [
        { hid: 'og:title', content: this.$t('reset_password') },
        { hid: 'og:url', content: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>
