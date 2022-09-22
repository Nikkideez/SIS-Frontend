<template>
  <!-- <v-navigation-drawer permanent style="width: 270px; height: 100%" right> -->
    <v-container>
      <v-date-picker v-model="calendar" no-title></v-date-picker>
      <v-divider></v-divider>
      <v-list>
        <v-row>
          <p style="padding-top: 10px; padding-left: 20px">Categories</p>
        </v-row>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
  name: "CalList",
  data: () => ({
    selectedItem: 0,
    items: [
      { text: "Health", icon: "mdi-folder" },
      { text: "Sleep", icon: "mdi-account-multiple" },
      { text: "Work", icon: "mdi-star" },
      { text: "Relax", icon: "mdi-history" },
      { text: "Education", icon: "mdi-check-circle" },
    ],
  }),
  computed: {
    calendar: {
      get() {
        return this.$store.state.calendar;
      },
      set(val) {
        this.$store.commit("SET_CALENDAR", val);
      },
    }
  },
};
</script>
