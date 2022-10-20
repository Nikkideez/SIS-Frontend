<template>
  <!-- <v-row>
    <v-col cols="12" md="6" class="blue rounded-br-xl">
      <div style="text-align: center; padding: 150px 0">
        <v-card-text class="white--text">
          <h1 class="text-center">Make Changes to your Profile</h1>
        </v-card-text>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-card-text class="mt-10">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block tile>Edit Profile Picture</v-btn>
          </v-col>
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block tile> Change Email</v-btn>
          </v-col>
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block tile> Change Password</v-btn>
          </v-col>
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block tile> Light mode</v-btn>
          </v-col>
          <v-col cols="12" sm="7">
            <v-btn class="white--text" color="violet" dark block tile @click="$emit('incrementStep', -1)">Log in</v-btn>
          </v-col>

        </v-row>
      </v-card-text>
    </v-col>
  </v-row> -->
  <v-row>
    <v-col cols="12" md="6" class="blue rounded-br-xl">
      <div style="text-align: center; padding: 180px 0">
        <v-card-text class="white--text">

          <h1 class="text-center">Edit AutoCal Profile</h1>
        </v-card-text>
        <div class="text-center">
          <v-btn tile outlined dark @click="$emit('incrementStep', -1)">View Profile</v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-card-text class="mt-12">
        <h4 class="text-center">Edit your Profile</h4>
        <h6 class="text-center grey--text">
          If you wish to change any of your details, put your new details into the textbox.

        </h6>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="First Name" outlined dense color="blue" class="mt-4" v-model=users.firstName></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Last Name" outlined dense color="blue" autocomplete="false" class="mt-4" v-model=users.lastName />
              </v-col>
            </v-row>
            <v-text-field label="Email" outlined dense color="blue" autocomplete="false" v-model=user.email />
            <v-row>
              <v-col cols="12">
                <v-btn color="blue" dark block tile>Change user Details</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="grey" dark block tile>Change user Password</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn class="black--text" color="white" dark block tile> Light mode</v-btn>
              </v-col>
            </v-row>


          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
 export default {
  props: {
    user: Object,
    users: Object
  },

  methods: {

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
