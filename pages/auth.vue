
<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <Login @incrementStep="incrementStep" />
            </v-window-item>
            <v-window-item :value="2">
              <Signup @incrementStep="incrementStep"/>
            </v-window-item>
          </v-window>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "../components/Login/Login"
import Signup from "../components/Login/Signup.vue"

export default {
  name: "Auth",
    components: {
      Login,
      Signup
    },

  data: () => ({
    email: "",
    password: "",
    feedback: null,
    newPassword: false,
    showNewPassword: false,
    user: null,
    step: 1,
  }),

  computed: {
    // checkUser: {
    //   get() {
    //     return UserPool.getCurrentUser();
    //   },
    // },
  },

  created: function () {
    // if (this.checkUser != null) this.$router.push("/dashboard");
  },

  methods: {
    incrementStep(val) {
      this.step += val
    },
  },
};
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