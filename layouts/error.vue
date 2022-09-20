<template>
  <v-app dark>


  </v-app>
</template>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item align="center" justify="center">
              <v-img src="\img\error.png" max-width="200px" />
              <h1 v-if="error.statusCode === 404">
                {{ pageNotFound }} <br />
                Something went wrong, check console logs to see what happened
              </h1>
              <h1 v-else>
                {{ otherError }}<br />
                Something went wrong, check console logs to see what happened
              </h1>
              <NuxtLink to="/">
                Home page
              </NuxtLink>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
