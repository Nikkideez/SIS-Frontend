<template>
  <v-container fluid>
    <!-- <v-col> md="x" must total to 12 in example below 7+5=12 -->
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8">
        <!-- <v-card class="pa-2" outlined tile>
          Section 1 // Change the v-col md=8 to md=12 to make it full width
        </v-card> -->
      </v-col>
      <v-col cols="6" md="12">
        <!-- <v-card class="pa-2" outlined tile>
          Section 2 // use me if confused https://vuetifyjs.com/en/components/grids/#v-col
        </v-card> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <blockquote class="blockquote">
          <!-- This section is for Manav -->
          <footer>
            <div class="flex-center">
            <div class="circle1">
              <v-img src="/img/paperplane.svg"></v-img>
            </div>
            </div>

            <div class="text--disabled  text-h5 my-2">Name: Manav Kumar</div>
            <div class="text--disabled  text-h5 my-2">Email: {{user ? user.email : null}}</div>
            <div class="text--disabled  text-h5 my-2">Age: 69 </div>
            <div class="text--disabled  text-h5 my-2">Phone Number: +61 666999666</div>
            

          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
          >
           Edit Profile 
          </v-btn>
            
            <!-- <v-card>
              <v-card-title>
                <span class="text-h5">Name: John Doe </span>
              </v-card-title>
            </v-card> -->
            
         
            <small>
              <!-- <em>&mdash;Jason</em> -->
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>

    <p v-if="users">{{users}} // {{users.firstName}} {{users.lastName}}</p>
    <v-btn @click="logoutUser">Logout</v-btn>
    <v-btn @click="getUser(user.uid)">Get User Data</v-btn>
  </v-container>
</template>

<style background: $vuetify.theme.themes[theme].background }>
.circle1 {
  border-radius: 50%;
  width: 250px;
  height: 250px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>



<script>
export default {
  name: 'Profile Page',

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
          alert("User has successfully logged out");
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
