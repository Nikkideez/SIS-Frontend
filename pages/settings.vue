<template>
  <v-row>
    <v-col cols="12" md="6" class="purple rounded-br-xl">
      <div style="text-align: center; padding: 220px 0">
        <v-card-text class="white--text">
          <h1 class="text-center">Welcome to Settings</h1>
        </v-card-text>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-card-text class="mt-12">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block rounded @click="redirectToProfile()">Account</v-btn>
             </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded @click="redirectToNotifications()"> Notifications</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Language</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Appearance</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Change Password</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Privacy and Security</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Help and Support</v-btn>
              </v-col>
              <v-col cols="12" sm="7">
               <v-btn class="white--text" color="violet" dark block rounded> Invite Friends</v-btn>
              </v-col>
          
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 370px !important;
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
  color: #494e03;
  background: #f2f8ff;
  border: 1px solid rgba(132, 255, 0, 0.2);
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
export default {
  name: 'SettingsPage',
  
  methods : {
  redirectToProfile(){
    this.$router.push('/profile');
  },
  redirectToNotifications(){
    this.$router.push('/notifications');
  }
}
}

</script>
