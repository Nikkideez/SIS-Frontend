<template>
  <v-row>
    <v-col cols="12" md="6" class="blue rounded-br-xl">
      <div style="text-align: center; padding: 180px 0">
        <v-card-text class="white--text">
          <h3 class="text-center">Already Signed up?</h3>
          <h6 class="text-center">
            Log in to your account so you can continue modifying
            <br />and organising your calendar
          </h6>
        </v-card-text>
        <div class="text-center">
          <v-btn tile outlined dark @click="$emit('incrementStep', -1)">Log in</v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="6">
      <v-card-text class="mt-12">
        <h4 class="text-center">Sign Up for an Account</h4>
        <h6 class="text-center grey--text">
          Let's get you all set up so you can start creating your first
          <br />
          AI calendar experiance
        </h6>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  outlined
                  dense
                  color="blue"
                  autocomplete="false"
                  class="mt-4"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  outlined
                  dense
                  color="blue"
                  autocomplete="false"
                  class="mt-4"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
              color="blue"
              autocomplete="false"
            />
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              color="blue"
              autocomplete="false"
              type="password"
            />
            <v-row>
              <v-col cols="12" sm="7">
                <v-checkbox label="I Accept" class="mt-n1" color="blue">
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="caption blue--text ml-n4">Terms & Conditions</span>
              </v-col>
            </v-row>
            <v-btn color="blue" dark block tile @click="createUser">Sign up</v-btn>

            <h5 class="text-center grey--text mt-4 mb-3">Or Sign up using</h5>
            <div class="signup-buttons">
              <a
                href="#"
                class="google-signup"
                @click.prevent="loginWithGoogle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  aria-hidden="true"
                >
                  <title>Google</title>
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#4285F4"
                      d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
                    ></path>
                  </g>
                </svg>
                Google
              </a>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import { doc, setDoc } from "firebase/firestore"

export default {
  name: 'SignUp',
  data: () => ({
    firstName: null,
    lastName: null,
    email: null,
    password: null
  }),
  methods: {
    testGetAuth() {
      console.log(getAuth())
    },
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        ).then((user) => {
          console.log(user.user)
          console.log(user.user.uid)
          this.createUserProfile(user.user.uid)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async createUserProfile(uid) {
      try {
        setDoc(doc(this.$fire.firestore, "users", uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          uid: uid
        }).then(() => {
          this.$router.push({ name: 'dashboard' })
        });
      } catch (e) {
        console.log(e)
      }
    },
  }
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