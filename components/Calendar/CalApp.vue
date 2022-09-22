<template>
  <!-- The toolbar for the calendar -->
  <v-row>
    <v-col>
      <!-- <v-sheet height="64"> -->
        <v-toolbar flat>
          <!-- <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Create Event
          </v-btn> -->
          <CalCreateEvent
            @emitCreateEvent="createNewEvent"
            @emitCancelEvent="removeEvent"
            @emitEditEvent="editEvent"
            ref="createEventRef"
          />
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="sendCalendarEvents"
          >
            Send Events
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="handleRequestAI"
          >
            Request AI
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      <!-- </v-sheet> -->
      <!-- I was a bit lazy with max height and hard coded 88vh, but a better way could definitely be implemented
            to make sure the calendar component takes up the rest of the page
          -->
      <!-- <v-sheet height="100%" max-height="88vh"> -->
      <v-sheet height="100%" max-height="85vh">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          :events="events"
          :event-ripple="false"
          :type="type"
          class="noselect"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave.native="cancelDrag"
        >
          <!-- This part helps add a draggable thing to the bottom of events incase you want to extend them -->
          <template v-slot:event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()"></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
        <!-- Dialogue that appears when you click on an event -->
        <!-- <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        > -->
          <CalMenu
            v-model="selectedOpen"
            :selectedEvent="selectedEvent"
            :closeDialogue="closeDialogue"
            :activator="selectedElement"
            @emitEditEvent="editEvent"
            @emitDeleteEvent="deleteEvent"
            offset-x
            ref="RefCalMenu"
          />
        <!-- </v-menu> -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<!-- Heaps of variables and functions ----------------------------------------------->
<script>
import CalMenu from "./Menu/CalMenu.vue";
import CalCreateEvent from "./CreateEvent/CalCreateEvent.vue";
import { doc, setDoc, getDoc, onSnapshot, collection, where } from "firebase/firestore";

export default {
  name: "CalendarApp",
  components: { CalMenu, CalCreateEvent },
  data: () => ({
    value: "",
    type: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false, //Decides whether the dialogue should be open or not
    events: [], // Object that holds all events
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    isMouseDown: false,
    requestAnimation: null,
    delay: 0,
  }),

  //Call getUserEvents on page load to populate the calendar with events from calendar
  mounted() {
    console.log("mounted");
    this.$refs.calendar.checkChange();
    this.$nextTick(function () {
      this.getUserEvents();
      // this.getEvents();
    });
  },
  methods: {
    async handleRequestAI() {
      const startWeek = this.$moment().startOf('isoWeek').valueOf()
      const endWeek = this.$moment().endOf('isoWeek').valueOf()
      const eventsCurrentWeek = this.events.filter(x => x.start > startWeek && x.start < endWeek).map(x => ({start: x.start, end: x.end, label: x.name}))
      const data = await this.$axios.$post('http://localhost:5000/calendar', {
        currentWeek: eventsCurrentWeek
      }).catch((e) => {
        console.log(e)
      })
      console.log(JSON.parse(data))
      this.events.push(...JSON.parse(data))
      // console.log(events)
      console.log(this.events)
    },
    viewDay({ date }) {
      // console.log("viewDay");
      this.value = date;
      this.type = "day";
    },
    // Also have no idea what purpose getEventColor serves
    // getEventColor(event) {
    //   // console.log("getEventColor");
    //   console.log(this.events);
    //   return event.color;
    // },
    // Today btn
    setToday() {
      // console.log("setToday");
      this.value = "";
    },
    // Prev btn
    prev() {
      // console.log("prev");
      this.$refs.calendar.prev();
    },
    // Next btn
    next() {
      // console.log("next");
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      // Evan: Close Menu If Clicked Again
      if (JSON.stringify(event) == JSON.stringify(this.selectedEvent) && this.selectedOpen) {
        this.selectedOpen = false
      } else {
        const open = () => {
          this.selectedEvent = event;
          this.selectedElement = nativeEvent.target;
          requestAnimationFrame(() =>
            this.requestAnimation = requestAnimationFrame(() => {
              this.selectedOpen = true;
            })
          );
        };
        if (this.selectedOpen) {
          this.selectedOpen = false;
          requestAnimationFrame(() => requestAnimationFrame(() => open()));
        } else {
          open();
        }
        nativeEvent.stopPropagation();
      }
    },
    rnd(a, b) {
      // console.log("rnd");
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    startDrag({ event, timed }) {
      // console.log("startDrag");
      if (event && timed) {
        this.dragEvent = event;
        // console.log(event);
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      this.isMouseDown = true;
      this.delay = this.selectedOpen ? 100 : 0
      setTimeout(function() {
        // Evan: Added delay to allow click out of menu on calendar rather than create new event
        if (this.isMouseDown) {
          this.selectedOpen = false
          // console.log("startTime");
          const mouse = this.toTime(tms);
          // This if statement activates when you click on an existing event
          // And want to move it with your mouse
          if (this.dragEvent && this.dragTime === null) {
            // console.log("startTime 1");
            const start = this.dragEvent.start;
            this.dragTime = mouse - start;
            // Otherwise this statement activates when you click into the calender
            // And it creates a new event
          } else {
            // console.log("startTime 2");
            this.createStart = this.roundTime(mouse);
            // createEvent is the object which holds a single events details.
            // adding more keys to this object will correlate to the data which an event holds
            this.createEvent = {
              name: `Event #${this.events.length}`,
              color: this.rndElement(this.colors),
              start: this.createStart,
              end: this.createStart,
              timed: true,
            };
            this.events.push(this.createEvent);
          }
        }
        this.delay = 0
      }.bind(this), this.delay);
    },
    extendBottom(event) {
      // console.log("extendBottom");
      this.isMouseDown = true;
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    // This function is called every time the mouse is moved and assists inputting time
    // Mainly for clicking into calendar to create event and dragging functionality
    mouseMove(tms) {
      // console.log("mouseMove");
      // Adding conditional if to only call this when mousedown should stop so many renders
      if (this.isMouseDown) {
        const mouse = this.toTime(tms);
        // This event activates when you have an existing event and want to extend the time
        if (this.dragEvent && this.dragTime !== null) {
          // Evan: Close CalMenu on Drag, free up calendar space on drag
          this.selectedOpen = false
          // console.log('mouseMove1')
          const start = this.dragEvent.start;
          const end = this.dragEvent.end;
          const duration = end - start;
          const newStartTime = mouse - this.dragTime;
          const newStart = this.roundTime(newStartTime);
          const newEnd = newStart + duration;
          this.dragEvent.start = newStart;
          this.dragEvent.end = newEnd;
          // This event activates when you create a new event and want to drag the time
        } else if (this.createEvent && this.createStart !== null) {
          // console.log("mouseMove2");
          const mouseRounded = this.roundTime(mouse, false);
          //I dont think think the min event is necessary here, could be wrong though
          // Calendar still works even though I commented it out
          // const min = Math.min(mouseRounded, this.createStart);
          const max = Math.max(mouseRounded, this.createStart);
          // this.createEvent.start = min;
          this.createEvent.end = max;
        }
      }
    },
    endDrag() {
      // console.log("endDrag");
      console.log(this.createEvent);
      // console.log(this.$refs)
      if (this.createEvent && !this.extendOriginal && this.isMouseDown) {
        this.$refs.createEventRef.handleNewEvent(this.createEvent);
        this.$refs.createEventRef.handleOpen();
      }
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
      this.isMouseDown = false;
      // this.openCreateEvent = true;
    },
    // This event cancels the last event that was created
    // The initial functionality was to cancel everytime your mouse leaves
    // I removed the event listener on calendar because its really annoying and it kept deleting events
    // Evan: Adding Back as it seems to work again
    cancelDrag() {
      // console.log("cancelDrag")
      // console.log(this.createEvent)
      if (this.createEvent) {
        console.log("cancelDrag 1");
        if (this.extendOriginal) {
          console.log("cancelDrag 2");
          this.createEvent.end = this.extendOriginal;
        } else {
          console.log("cancelDrag 3");
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            console.log("cancelDrag 4");
            this.events.splice(i, 1);
          }
        }
      }
      // console.log(this.events);
      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    // Removes an event from the events array
    removeEvent(createEvent) {
      const i = this.events.indexOf(createEvent);
      if (i !== -1) {
        console.log("cancelDrag 4");
        this.events.splice(i, 1);
      }
    },
    // Rounds time to nearest 30 mins
    roundTime(time, down = true) {
      // console.log("roundTime");
      const roundTo = 30; // minutes
      const roundDownTime = roundTo * 60 * 1000;
      // The true or false basically determines if there is it rounds up or down
      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    // gets tms value and turns it into a date value to be passed into create event object
    toTime(tms) {
      // console.log("toTime");
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    // Just gets some random number, might delete soon
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    // Returns some random element(etc some random color). Not sure if we will need this but we will see
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    // Closing the Dialogue
    closeDialogue() {
      this.selectedOpen = false;
    },
    // Function to create events into the calendar
    createNewEvent(
      name,
      startDate = this.date,
      endDate = this.date,
      category,
      location = "",
      color = this.colors[1]
    ) {
      console.log("createNewEvent");
      this.createEvent = {
        name: name,
        start: this.roundTime(startDate),
        end: this.roundTime(endDate),
        category: category,
        location: location,
        color: color,
        timed: true,
      };
      console.log(this.createEvent);
      this.events.push(this.createEvent);
    },
    // Edit an existing event
    editEvent(createEvent, name, start, end, category, location, color) {
      const i = this.events.indexOf(createEvent);
      this.events[i].name = name;
      this.events[i].start = start;
      this.events[i].end = end;
      this.events[i].category = category;
      this.events[i].location = location;
      this.events[i].color = color;
    },
    // Sending events to the firestore database
    async sendCalendarEvents() {
      console.log(this.events);
      try {
        await setDoc(doc(this.$fire.firestore, "events", "test"), {
          events: this.events,
        }, { merge: true }); //Evan: Merge to stop overriding data
      } catch (e) {
        console.log(e);
      }
    },
    deleteEvent(createEvent) {
      const i = this.events.indexOf(createEvent);
      this.events.splice(i, 1)
    },
    // Get user events from database and add them to events array
    async getUserEvents() {
      // const docRef = doc(this.$fire.firestore, "events", "test");
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   console.log(docSnap.data().events);
      //   this.events.push(...docSnap.data().events);
      //   console.log(this.events);
      // } else {
      //   console.log("No events bro :-(");
      // }
      // const docRef = doc(this.$fire.firestore, "events", "test");
      // Evan: Change for Realtime Data as getDoc only receives once
      const unsubEvents = onSnapshot(doc(this.$fire.firestore, "events", "test"), (doc) => {
        this.events = doc.data().events
      })
    },
  },
};
</script>

<!-- SCSS styling (some slightly different syntax when compare to CSS) -->
<!-- This SCSS lets you drag existing events (Pretty crazy how SCSS can do this) -->
<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }

  &:hover::after {
    display: block;
  }
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
