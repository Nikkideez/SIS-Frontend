<template>
  <v-container>
    {{user ? user.uid : null}}
    <p>{{user ? `Hello ${user.email}` : 'NOT LOGGED IN >:('}}</p>
    <p v-if="users">{{users}}</p>
    <v-btn @click="logoutUser">Logout</v-btn>
    <v-btn @click="getUser(user.uid)">Get User Data</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    users: null
  }),
  computed: {
    user: {
      get() {
        return this.$store.state.user
      }
    },
  },
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
    async getUser(uid) {
      try {
        this.$fire.firestore.collection('users').where('uid', '==', uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.users = doc.data()
          })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
</style>