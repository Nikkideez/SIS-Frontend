<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <ProfileView @incrementStep="incrementStep" :user="user" :users="users" />
            </v-window-item>
            <v-window-item :value="2">
              <ProfileEdit @incrementStep="incrementStep" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
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

.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}

.signup-buttons {
  margin-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;
}

.google-signup {
  color: #031b4e;
  background: #f2f8ff;
  border: 1px solid rgba(0, 105, 255, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0;
  width: 100%;
  height: 35px;
  padding: 5px;
  text-align: center;
  position: inherit;
}

.signup-buttons a {
  vertical-align: middle;
  text-decoration: none;
}

.signup-buttons svg {
  left: 16px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>


<script>
import ProfileView from "../components/Profile/ProfileView.vue";
import ProfileEdit from "../components/Profile/ProfileEdit.vue";
export default {
  components: {
    ProfileView,
    ProfileEdit
  },

  name: 'Profile Page',

  data: () => ({
    users: null,
    step: 1,
  }),
  computed: {
    user: {
      get() {
        return this.$store.state.user
      }
    },
  },
  methods: {
    incrementStep(val) {
      this.step += val
    },

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
    },


  },
  beforeMount() {
    this.getUser(this.user.uid);
  }

}
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}

.signup-buttons {
  margin-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;
}

.google-signup {
  color: #031b4e;
  background: #f2f8ff;
  border: 1px solid rgba(0, 105, 255, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0;
  width: 100%;
  height: 35px;
  padding: 5px;
  text-align: center;
  position: inherit;
}

.signup-buttons a {
  vertical-align: middle;
  text-decoration: none;
}

.signup-buttons svg {
  left: 16px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
