
<template>
  <v-container fluid>
    <navigation :color="color"  />
    <v-main style="padding: 66px 0px 0px 0px; ">
      <home />
      <about />
      <download />
      <pricing />
      <contact />
    </v-main>
    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="#29be83"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>
    <foote />
  </v-container>
</template>


<style >
  .container {
    margin-bottom: 0;
    padding: 0;
    max-width: 100%;
    height: 100%;
  }

  .v-main {
    background-image: url("/img/bgMain.png");
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }

</style>

<script>

import navigation from "@/components/Welcome/Navigation.vue";
import foote from "@/components/Welcome/Footer.vue";
import home from "@/components/Welcome/HomeSection.vue";
import about from "@/components/Welcome/AboutSection.vue";
import download from "@/components/Welcome/DownloadSection.vue";
import pricing from "@/components/Welcome/PricingSection.vue";
import contact from "@/components/Welcome/ContactSection.vue";

export default {
  name: 'WelcomePage',

  components: {
    navigation,
    foote,
    home,
    pricing,
    contact,
    about,
    download,
  },
  data: () => ({
    fab: null,
    color: "#29be83",
    flat: null,
  }),

  watch: {
    fab(value) {
      if (value) {
        this.color = "#29be83";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
