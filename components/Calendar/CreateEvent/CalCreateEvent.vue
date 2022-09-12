<template>
  <span>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          class="mr-4"
          color="grey darken-2"
          v-bind="attrs"
          v-on="on"
        >
          Create Event
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Event</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Picking the Start Date ---------------------->
              <v-col cols="12" sm="6" md="6">
                <CalDatePicker
                  menu-label="Start Date"
                  @passDate="setStartDate"
                />
              </v-col>
              <!-- Picking the Start Time (This can be improved I know)-->
              <v-col cols="12" sm="6" md="6">
                <CalTimePicker
                  menu-label="Start Time"
                  @passTime="setStartTime"
                />
              </v-col>
              <!-- Picking the End Date ----------------------->
              <v-col cols="12" sm="6" md="6">
                <CalDatePicker menu-label="End Date" @passDate="setEndDate" />
              </v-col>
              <!-- Picking the End Time (This can be improved I know)-->
              <v-col cols="12" sm="6" md="6">
                <CalTimePicker menu-label="End Time" @passTime="setEndTime" />
              </v-col>
              <!-- Name --------------------------------------->
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
              <!-- Category ----------------------------------->
              <v-col cols="12">
                <v-select
                  :items="categories"
                  v-model="category"
                  label="Category*"
                  required
                ></v-select>
              </v-col>
              <!-- Location ----------------------------------->
              <v-col cols="12">
                <v-text-field
                  label="Location"
                  required
                  v-model="location"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="consoleData"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import CalDatePicker from "./CalDatePicker.vue";
import CalTimePicker from "./CalTimePicker.vue";
export default {
  name: "CalCreateEvent",
  props: ["selectedEvent", "closeDialogue"],
  components: { CalDatePicker, CalTimePicker },
  data: () => ({
    dialog: false,
    time: null,
    menu2: false,
    modal2: false,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    name: "",
    categories: ["Health", "Sleep", "Work", "Relax", "Education"],
    category: "",
    location: "",
  }),
  methods: {
    debug(data) {
      console.log(data);
    },
    consoleData() {
      console.log(this.startDate);
      console.log(this.startTime);
      console.log(this.endDate);
      console.log(this.endTime);
      console.log(this.name);
      console.log(this.category);
      console.log(this.location);
    },
    setStartDate(date) {
      this.startDate = date;
    },
    setStartTime(time) {
      this.startTime = time;
    },
    setEndDate(date) {
      this.endDate = date;
    },
    setEndTime(time) {
      this.endTime = time;
    },
  },
};
</script>
