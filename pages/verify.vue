<template>
  <page-layout :title="$t('verify_email')">
    <verify-password-form />
  </page-layout>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('verify_email'),
      meta: [
        { hid: 'og:title', content: this.$t('verify_email') },
        { hid: 'og:url', content: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]
    }
  }
}
</script>
