<template>
  <v-container class="px-8 mt-6">
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="mt-12">
          <header class="d-flex py-4 px-6 align-center black">
            <h2 class="white--text text-capitalize font-weight-bold" v-text="title" />
            <a :href="$config.frontendURL" class="brand-wrapper d-flex align-center justify-center rounded-circle ml-auto">
              <img src="~/static/brand.png" alt="Brand">
            </a>
          </header>
          <v-card-text>
            <slot />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
