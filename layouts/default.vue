<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" :clipped="clipped" fixed app v-if="activeUser && !['', 'auth'].includes($route.name)">
      <v-list >
        <v-img v-show="!miniVariant" src="\img\autocalLogoTitle.png"></v-img>
        <v-img v-show="miniVariant" src="\autocal_logo.png"></v-img>

        <!-- If users are logged in -->
        <div v-if="activeUser">
          <div v-if="user">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" class="font-weight-light" />
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>

        <!-- If Users are not Logged in  -->
        <v-list-item v-if="!activeUser" to="/" router exact>
          <v-list-item-action>
            <v-icon>mdi-home-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Welcome</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!activeUser" to="/auth" router exact>
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Login and Registration</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0" clipped-right outlined>

      <v-btn icon @click.stop="miniVariant = !miniVariant" v-if="activeUser">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>


      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- If users are logged in -->
      <v-toolbar-title>{{activeUser ? ` ${user.email}` : ''}}</v-toolbar-title>
      <v-btn icon to="/profile" v-if="activeUser">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <!-- If Users are not Logged in  -->
      <!-- <v-btn icon to="/auth" v-if="!user">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <!-- <v-container> -->
        <Nuxt />
      <!-- </v-container> -->
    </v-main>
    <!-- <v-navigation-drawer app right clipped v-if="$route.name == 'calendar'" :width="290">
      <CalList />
    </v-navigation-drawer> -->
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </v-app>
</template>

<script>
// import CalList from "~/components/Calendar/CalList.vue";

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-calendar',
          title: 'Calendar',
          to: '/calendar',
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/settings'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'TEST PAGE',
          to: '/inspire'
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'AutoCal',
      users: null,
      activeUser: null,
    }
  },

  // components: {
  //   CalList
  // },

  computed: {
    user: {
      get() {
        return this.$store.state.user
      }
    },
  },
  watch: {
    user(val) {
      console.log(this.user)
      if (!val) {
        this.activeUser = null
      } else {
        this.activeUser = this.user
      }
    }
  },
  mounted() {
    if (this.user) {
      // this.getUser(this.user.uid)  //Evan: Mounted can be used, REMINDER: Cleanup Code
      this.activeUser = this.user
    }
  },
  methods: {
    // getUnits: function() {
    //   console.log("Running on initialise");
    // },

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
  },
  // beforeMount(){
  //   this.getUnits()
  // },
}
</script>

<style>
::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
  background: #d3d3d3;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(168, 168, 168);
}
html { overflow-y: auto }
</style>