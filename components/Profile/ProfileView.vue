<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card-text class="mt-12">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <div class="flex-center">
              <div class="circle1">
                <v-img src="/img/paperplane.svg"></v-img>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
    <v-col cols="12" md="8" style="background-color: #29be83;" class="rounded-bl-xl">
      <div style="text-align: center; padding: 180px 0">
        <v-card-text class="white--text">
          <h1 class="text-center">AutoCal User Details</h1>
          <br />
          <h3 class="text-center" v-if="users">
            User: {{users.firstName}} {{users.lastName}}
          </h3>
          <h3 class="text-center" v-if="users">
            Email: {{user ? user.email : null}}
          </h3>
          <h6 class="text-center" v-if="users">
            AutoCal ID: {{users.uid}}
          </h6>

        </v-card-text>
        <div class="text-center">
          <v-btn tile outlined dark @click="$emit('incrementStep', 1)">Edit Profile</v-btn>
          <v-btn tile outlined dark @click="logoutUser">Logout</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    user: String,
    users: String
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
    }
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
