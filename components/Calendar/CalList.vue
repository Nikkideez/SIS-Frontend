<template>
  <!-- <v-navigation-drawer permanent style="width: 270px; height: 100%" right> -->
  <v-container class="container">
    <!-- <v-btn @click="test">Test</v-btn> -->
    <!-- {{lists}} -->
    <!-- <v-date-picker v-model="calendar" no-title></v-date-picker> -->
    <DateCarousel :events="events" :recommendedEvents="recommendedEvents" />
    <!-- Calendar Pie Chart here -->
    <!-- <PieChart /> -->
    <v-divider/>
    <v-list dense>
      <v-list-item-content>
        <v-row>
          <v-col class="ml-5">
            <v-btn icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn icon @click="handleColorDialog">
              <v-icon>mdi-format-color-fill</v-icon>
            </v-btn>
          </v-col>
          <v-col style="padding-right: 20px">
            <!-- <v-btn @click="requestEvents([lists[0].items[0].params, lists[0].items[1].params, lists[0].items[3].params])">Request</v-btn> -->
            <v-btn @click="requestMultiple" outlined>Request</v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-list-group v-for="(list, i) in lists" :key="i" v-model="list.active">
        <template v-slot:activator>
          <v-list-item-content>
            <v-layout>
              <v-list-item-title v-text="list.title"></v-list-item-title>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text small v-bind="attrs" v-on="on" @click.stop="">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add {{ list.type }}</span>
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
                  @click="handleCheckbox(item)"
                >
                </v-checkbox>
              </v-col>
              <v-col md="4">
                {{ item.text }}
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
              <p>Category: {{ item.params.category }}</p>
              <p>Length: {{ item.params.length / 2 }} Hours</p>
              <p>Max Per Day: {{ item.params.perDay }}</p>
              <p>Days: {{ item.params.selectedDays }}</p>
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
      @updateList="updateList"
    />
    <ChangeColorSettings v-model="changeColorSettings" />
  </v-container>
  <!-- </v-navigation-drawer> -->
</template>

<script>
import RequestCategoryDialog from "./Category/RequestCategoryDialog.vue";
import ChangeColorSettings from "./Category/ChangeColorSettings.vue";
import PieChart from "./PieChart/PieChart.vue";
import DateCarousel from "./DateCarousel/DateCarousel.vue";

export default {
  name: "CalList",
  data: () => ({
    lists: [
      {
        active: true,
        items: [
          {
            text: "Sleep",
            color: "rgb(33, 150, 245)",
            active: true,
            params: {
              category: "Sleep",
              length: 5,
              perDay: 1,
              recommendations: 2,
              selectedDays: [0, 1, 2, 3, 4, 5, 6],
              color: "rgb(33, 150, 245)",
            },
            show: false,
            index: 0,
          },
          {
            text: "Gym",
            color: "rgb(103, 58, 183)",
            active: true,
            params: {
              category: "Fitness",
              length: 5,
              perDay: 1,
              recommendations: 2,
              selectedDays: [0, 1, 2, 3, 4, 5, 6],
              color: "rgb(103, 58, 183)",
            },
            show: false,
            index: 1,
          },
          {
            text: "Work",
            color: "rgb(0, 188, 212)",
            active: true,
            params: {
              category: "Work",
              length: 5,
              perDay: 1,
              recommendations: 2,
              selectedDays: [0, 1, 2, 3, 4, 5, 6],
              color: "rgb(0, 188, 212)",
            },
            show: false,
            index: 2,
          },
          {
            text: "Relax",
            color: "rgb(255, 152, 0)",
            active: true,
            params: {
              category: "Leisure",
              length: 5,
              perDay: 1,
              recommendations: 2,
              selectedDays: [0, 1, 2, 3, 4, 5, 6],
              color: "rgb(255, 152, 0)",
            },
            show: false,
            index: 3,
          },
          {
            text: "Study",
            color: "rgb(76, 175, 80)",
            active: true,
            params: {
              category: "Education",
              length: 5,
              perDay: 1,
              recommendations: 2,
              selectedDays: [0, 1, 2, 3, 4, 5, 6],
              color: "rgb(76, 175, 80)",
            },
            show: false,
            index: 4,
          },
        ],
        title: "Events",
        type: "Event",
      },
      // {
      //   active: true,
      //   items: [
      //     { text: "Sleep", color: "rgb(33, 150, 245)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
      //     { text: "Fitness", color: "rgb(103, 58, 183)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
      //     { text: "Work", color: "rgb(0, 188, 212)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
      //     { text: "Leisure", color: "rgb(255, 152, 0)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
      //     { text: "Education", color: "rgb(76, 175, 80)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
      //   ],
      //   title: 'Events',
      //   type: 'Event'
      // },
    ],
    colorKey: {
      Sleep: "rgb(33, 150, 245)",
      Fitness: "rgb(103, 58, 183)",
      Work: "rgb(0, 188, 212)",
      Leisure: "rgb(255, 152, 0)",
      Education: "rgb(76, 175, 80)",
    },
    // eventList: [
    // ],
    selectedCategory: null,
    requestDialog: false,
    changeColorSettings: false,
  }),

  props: {
    events: Array,
    recommendedEvents: Object,
  },

  components: {
    RequestCategoryDialog,
    ChangeColorSettings,
    PieChart,
    DateCarousel,
  },
  // Evan: Placeholder, remove once get user details is done
  created() {
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
  methods: {
    handleCategoryClick(category) {
      this.selectedCategory = category;
      this.requestDialog = true;
    },
    handleColorDialog() {
      this.changeColorSettings = true;
      console.log(this.changeColorSettings);
    },
    requestMultiple() {
      this.requestEvents(
        this.lists[0].items.filter((x) => x.active).map((x) => x.params)
      );
    },
    requestEvents(options) {
      this.$emit("requestEvents", options);
    },
    handleCheckbox(item) {
      console.log(item, item.active);
    },
    changeColors() {
      console.log("point 1");
      this.$emit("changeColors");
    },
    updateList(options) {
      console.log(options);
      this.lists[0].items[options.index].params.length = options.length;
      this.lists[0].items[options.index].params.recommendations =
        options.recommendations;
      this.lists[0].items[options.index].params.selectedDays =
        options.selectedDays;
      this.lists[0].items[options.index].params.perDay = options.perDay;
      this.lists[0].items[options.index].text = options.text;
      this.lists[0].items[options.index].params.category = options.category;
      let category = options.category;
      this.lists[0].items[options.index].color = this.colorKey[options.category]
      // console.log(this.colorKey);
    },
  },
};
</script>

<style>
/* NO SCOPE: Transparent Calendar Background */
.theme--dark .v-picker__body {
  background: transparent;
}
.theme--dark.v-navigation-drawer {
  background-color: #272727;
}
.theme--dark.v-card {
  background-color: #272727;
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
