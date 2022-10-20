<template>
  <v-container>
    <!-- <v-row no-gutters> -->

      <!-- <v-col cols="12" md="10"> -->
        <CalApp ref="refCalApp"/>
      <!-- </v-col> -->

      <!-- <v-col cols="6" md="2"> -->
        <v-navigation-drawer app right clipped :width="290">
          <CalList @requestEvents="requestEvents" @requestSelectedEvents="requestSelectedEvents" :events="calendarEvents" :recommendedEvents="recommendedEvents" />
        </v-navigation-drawer>

      <!-- </v-col> -->
    <!-- </v-row> -->
    <!-- <CalApp /> -->
  </v-container>
</template>

<script>
import CalList from "~/components/Calendar/CalList.vue";
import CalApp from "~/components/Calendar/CalApp.vue";
export default {
  name: "TestPage",
  components: { CalApp, CalList },
  data: () => ({
    calendarEvents: null,
    recommendedEvents: {
      type: null,
      events: null
    },
  }),
  mounted() {
    this.$watch(
      () => {
        return this.$refs.refCalApp.events;
      },
      (val) => {
        this.calendarEvents = val
      }
    );
    this.$watch(
      () => {
        return this.$refs.refCalApp.recommendedEvents;
      },
      (val) => {
        this.recommendedEvents = val
      }
    );
  },
  methods: {
    requestEvents(options) {
      this.$refs.refCalApp.handleRequestAI(options)
    },
    requestSelectedEvents(options) {
      this.$refs.refCalApp.handleRequestAI(options)
    },
  },
};
</script>

<style>
  .container {
    margin-bottom: 0;
    padding: 0;
    max-width: 100%;
    height: 100%;
  }

  .v-application {
    background: #303030!important;
  }
</style>
