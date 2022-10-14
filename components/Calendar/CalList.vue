<template>
  <!-- <v-navigation-drawer permanent style="width: 270px; height: 100%" right> -->
    <v-container class="container">
    <!-- {{lists}} -->
      <v-date-picker v-model="calendar" no-title></v-date-picker>
      <v-list dense>
        <v-list-group v-for="(list, i) in lists" :key="i" v-model="list.active">
          <template v-slot:activator>
            <v-list-item-content>
              <v-layout>
              <v-list-item-title v-text="list.title"></v-list-item-title>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click.stop=""
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Add {{list.type}}</span>
                </v-tooltip>
              </v-layout>
            </v-list-item-content>
          </template>
          <v-list-group
            v-for="item in list.items"
            :key="item.title"
            :append-icon="null"
            prepend-icon=""
            sub-group
            v-model="item.show"
          >
            <template v-slot:activator>
              <!--  @click.stop="handleCategoryClick(item)" -->
              <v-row align="center" @click.stop="handleCategoryClick(item)">
                <v-col md="2">
                  <v-checkbox
                    v-model="item.active"
                    :color="item.color"
                    @click.stop=""
                    hide-details
                    class="ml-2 mb-2"
                    dense
                  >
                  </v-checkbox>
                </v-col>
                <v-col md="4">
                  {{item.text}}
                </v-col>
                <v-col align="right" class="ml-4">
                  <v-btn icon @click.stop="item.show = !item.show">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </v-col>
                <v-col align="right">
                  <v-btn icon @click.stop="">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <v-list-item>
              <v-list-item-content>
                <p>Length: {{item.params.length}}</p>
                <p>Max Per Day: {{item.params.perDay}}</p>
                <p>Days: {{item.params.selectedDays}}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- <v-list-item
            v-for="item in list.items"
            :key="item.title"
            @click="handleCategoryClick(item)"
          >
            <v-list-item-content>
              <v-row align="center">
                <v-col md="2">
                  <v-checkbox
                    v-model="item.active"
                    :color="item.color"
                    @click.stop=""
                    hide-details
                    class="ml-2 mb-2"
                    dense
                  >
                  </v-checkbox>
                </v-col>
                <v-col md="4">
                  {{item.text}}
                </v-col>
                <v-col align="right" class="ml-5">
                  <v-btn icon @click.stop="">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </v-col>
                <v-col align="right">
                  <v-btn icon @click.stop="">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-group>
      </v-list>
      <RequestCategoryDialog
        v-model="requestDialog"
        :selectedCategory="selectedCategory"
        @request="requestEvents"
      />
    </v-container>
  <!-- </v-navigation-drawer> -->
</template>

<script>
import RequestCategoryDialog from "./Category/RequestCategoryDialog.vue"

export default {
  name: "CalList",
  data: () => ({
    lists: [
      {
        active: true,
        items: [
          { text: "Sleep", color: "rgb(33, 150, 245)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Fitness", color: "rgb(103, 58, 183)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Work", color: "rgb(0, 188, 212)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Leisure", color: "rgb(255, 152, 0)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Education", color: "rgb(76, 175, 80)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
        ],
        title: 'Categories',
        type: 'Category'
      },
      // {
      //   active: true,
      //   items: [
      //     { text: "Sleep", color: "rgb(33, 150, 245)", active: true },
      //     { text: "Fitness", color: "rgb(103, 58, 183)", active: true },
      //     { text: "Work", color: "rgb(0, 188, 212)", active: true },
      //     { text: "Leisure", color: "rgb(255, 152, 0)", active: true },
      //     { text: "Education", color: "rgb(76, 175, 80)", active: true },
      //   ],
      //   title: 'Events',
      //   type: 'Event'
      // },
    ],
    // eventList: [
    // ],
    selectedCategory: null,
    requestDialog: false,
  }),

  components: {
    RequestCategoryDialog
  },
  // Evan: Placeholder, remove once get user details is done
  created() {
    this.calendar = this.$moment().format("YYYY-MM-DD")
    // try {
    //   this.$fire.firestore.collection('users').where('uid', '==', uid).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       this.users = doc.data()
    //     })
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
  },
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
  methods: {
    handleCategoryClick(category) {
      this.selectedCategory = category
      this.requestDialog = true
    },
    requestEvents(options) {
      this.$emit("requestEvents", options)
    },
  },
};
</script>

<style>
  /* NO SCOPE: Transparent Calendar Background */
  .theme--dark .v-picker__body {
    background: transparent
  }
</style>
<style scoped>
  /* SCOPED: White List Highlight and Text */
  .theme--dark.v-application .primary--text {
    color: white !important;
  }
  /* Transaparent container */
  .container {
    background: transparent !important;
  }
</style>