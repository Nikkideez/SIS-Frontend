<template>
  <v-container>
    <p>{{this.$store.state.user ? `Hello ${this.$store.state.user.email}` : 'NOT LOGGED IN >:('}}</p>
    <v-btn @click="logoutUser">Logout</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  middleware: "auth",
  data: () => ({
  }),
  methods: {
    async logoutUser() {
      try {
        await this.$fire.auth.signOut().then(() => {
          console.log("Sign Out Successful")
          this.$router.push({ name: 'auth' })
        })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style>
</style>