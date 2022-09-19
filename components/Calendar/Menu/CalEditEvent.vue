<template>
  <span>
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Event</span>
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
          <v-btn color="blue darken-1" text @click="show = false"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="handleSave"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import CalDatePicker from "../CreateEvent/CalDatePicker.vue";
import CalTimePicker from "../CreateEvent/CalTimePicker.vue";
export default {
  name: "CalEditEvent",
  props: ["value", "selectedEvent", "closeDialogue", "openCreateEvent"],
  components: { CalDatePicker, CalTimePicker },
  data: () => ({
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
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        this.cleanUp()
      } else {
        if (this.selectedEvent) {
          this.createEvent = this.selectedEvent
          this.startDate = this.$moment(this.selectedEvent.start).format("YYYY-MM-DD")
          this.endDate = this.$moment(this.selectedEvent.end).format("YYYY-MM-DD")
          this.startTime = this.$moment(this.selectedEvent.start).format("HH:mm")
          this.endTime = this.$moment(this.selectedEvent.end).format("HH:mm")
          this.name = this.selectedEvent.name
          this.category = this.selectedEvent.category
          this.location = this.selectedEvent.location
          this.color = this.selectedEvent.color
        }
      }
    }
  },
  methods: {
    handleSave() {
      const start = this.$moment(this.startDate + 'T' + this.startTime).valueOf()
      const end = this.$moment(this.endDate + 'T' + this.endTime).valueOf()
      console.log(this.createEvent)
      this.$emit(
        "emitEditEvent",
        {
          createEvent: this.createEvent,
          name: this.name,
          start: start,
          end: end,
          category: this.category,
          location: this.location,
          color: this.color
        }
      );
      this.show = false;
    },
    setAllDates(start, end) {
      console.log("setAllDates");
      this.startDate = start.substring(0, 10);
      this.startTime = start.substring(11, 16);
      this.endDate = end.substring(0, 10);
      this.endTime = end.substring(11, 16);
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
    },
    cleanUp() {
      this.startDate = null
      this.endDate = null
      this.startTime = null
      this.endTime = null
      this.name = null
      this.category = null
      this.location = null
      this.color = null
    },
  },
};
</script>
