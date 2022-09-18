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
                  :initial-date="startDate"
                  @passDate="setStartDate"
                />
              </v-col>
              <!-- Picking the Start Time (This can be improved I know)-->
              <v-col cols="12" sm="6" md="6">
                <CalTimePicker
                  menu-label="Start Time"
                  :initial-time="startTime"
                  @passTime="setStartTime"
                />
              </v-col>
              <!-- Picking the End Date ----------------------->
              <v-col cols="12" sm="6" md="6">
                <CalDatePicker
                  menu-label="End Date"
                  @passDate="setEndDate"
                  :initial-date="endDate"
                />
              </v-col>
              <!-- Picking the End Time (This can be improved I know)-->
              <v-col cols="12" sm="6" md="6">
                <CalTimePicker
                  menu-label="End Time"
                  @passTime="setEndTime"
                  :initial-time="endTime"
                />
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
              <!-- Color ----------------------------------->
              <v-col cols="12">
                <v-select
                  :items="colors"
                  v-model="color"
                  label="Color"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleClose"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="handleSave"> Save </v-btn>
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
  props: ["selectedEvent", "closeDialogue", "openCreateEvent"],
  components: { CalDatePicker, CalTimePicker },
  data: () => ({
    dialog: false,
    time: null,
    menu2: false,
    modal2: false,
    currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substring(0, 10),
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    name: "",
    categories: ["Health", "Sleep", "Work", "Relax", "Education"],
    category: "",
    location: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    color: "",
    testValue: null,
    createEvent: null,
  }),
  mounted() {
    this.$nextTick(function () {
      const start = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      ).toISOString();
      const end = start;
      this.setAllDates(start, end);
    });
  },
  methods: {
    debug(data) {
      console.log(data);
    },
    handleSave() {
      const start = new Date(this.startDate + "T" + this.startTime);
      const end = new Date(this.endDate + "T" + this.endTime);
      // console.log(this.startDate)
      // console.log(this.endDate)
      // console.log(this.startTime)
      // console.log(this.endTime)
      // console.log(start);
      // console.log(end);
      // console.log(this.name);
      if (this.createEvent) {
        this.$emit(
          "emitEditEvent",
          this.createEvent,
          this.name,
          start,
          end,
          this.category,
          this.location,
          this.color
        );
      } else {
        this.$emit(
          "emitCreateEvent",
          this.name,
          start,
          end,
          this.category,
          this.location,
          this.color
        );
      }
      this.dialog = false;
    },
    setAllDates(start, end) {
      console.log("setAllDates");
      this.startDate = start.substring(0, 10);
      this.startTime = start.substring(11, 16);
      this.endDate = end.substring(0, 10);
      this.endTime = end.substring(11, 16);
    },
    setStartDate(date) {
      // console.log(date)
      this.startDate = date;
      // console.log(this.startDate)
    },
    setStartTime(time) {
      // console.log(time)
      this.startTime = time;
    },
    setEndDate(date) {
      this.endDate = date;
    },
    setEndTime(time) {
      this.endTime = time;
    },
    handleOpen() {
      this.dialog = !this.dialog;
    },
    handleClose() {
      // emitCancelEvent should only be called if createEvent is not null (drag n drop functionality was used to create the event)
      if (this.createEvent) {
        console.log("cancelEvent called");
        this.$emit("emitCancelEvent", this.createEvent);
      }
      // this.$refs.datePickerRef.reInitialiseTime();
      this.dialog = false;
    },
    handleNewEvent(createEvent) {
      console.log("working!!!");
      this.createEvent = createEvent;
      const start = new Date(
        createEvent.start - new Date().getTimezoneOffset() * 60000
      ).toISOString();
      const end = new Date(
        createEvent.end - new Date().getTimezoneOffset() * 60000
      ).toISOString();
      this.setAllDates(start, end);
      // console.log(this.startDate);
      // console.log(this.startTime);
      // // console.log(this.$refs);
      // // this.$refs.datePickerRef.changeDate(createEvent.start);
      // // this.startDate = createEvent.start;
      // // console.log(createEvent.start);
      // // this.endDate = createEvent.end;
    },
  },
};
</script>
