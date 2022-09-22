<template>
  <!-- <v-container> -->
    <!-- <v-row no-gutters>

      <v-col cols="12" md="10">
        <CalApp />
      </v-col>

      <v-col cols="6" md="2">
        <CalList />
      </v-col>
    </v-row> -->
    <CalApp />
  <!-- </v-container> -->
</template>

<script>
// import CalList from "~/components/Calendar/CalList.vue";
import CalApp from "~/components/Calendar/CalApp.vue";
export default {
  name: "TestPage",
  components: { CalApp },
};
</script>

<style>
  .container {
    margin-bottom: 0;
    padding: 0;
    max-width: 100%;
    height: 100%;
  }
</style>
