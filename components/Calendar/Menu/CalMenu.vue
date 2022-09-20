<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    :activator="activator"
    offset-x
    :left="!right"
    :right="right"
    max-width="500px"
    style
    :content-class="right ? 'menu-right' : 'menu-left'"
  >
    <v-card color="grey darken-3" width="500px" flat>
      <v-toolbar :color="selectedEvent.color" dark :height="height">
        <v-row>
        <v-card-title class="card-title" style="word-break: break-word" ref="title">{{selectedEvent.name}}</v-card-title>
        </v-row><v-spacer></v-spacer>
        <v-btn icon @click="editDialog = true">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon @click="deleteDialog = true">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <span v-html="selectedEvent.details"></span>
        <v-container v-if="selectedEvent">
          <p v-if="startFormatted" style="font-size: 20px">{{startFormatted.format("DD/MM/YYYY") == endFormatted.format("DD/MM/YYYY") ?
            startFormatted.format("dddd, MMMM, YY  ⋅  hh:mm A – ") + endFormatted.format("hh:mm A") : 
            startFormatted.format("dddd, MMMM, YYYY, hh:mm A  – ") + endFormatted.format("dddd, MMMM, YYYY, hh:mm A") }}</p>
          <p>{{selectedEvent.category ? 'Category: ' + selectedEvent.category : null}}</p>
          <p>{{selectedEvent.location ? 'Location: ' + selectedEvent.location : null}}</p>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="secondary" @click="closeDialogue"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
    <CalEditEvent v-model="editDialog" :selectedEvent="selectedEvent" @emitEditEvent="emitEditEvent"/>
    <CalDeleteEvent v-model="deleteDialog" @emitDeleteEvent="emitDeleteEvent"/>
  </v-menu>
</template>

<script>
import CalEditEvent from "./CalEditEvent.vue"
import CalDeleteEvent from "./CalDeleteEvent.vue"

export default {
  name: "CalMenu",
  props: ["value", "activator", "selectedEvent", "closeDialogue"],
  data: () => ({
    height: 100,
    right: true,
    startFormatted: null,
    endFormatted: null,
    timePeriod: null,
    editDialog: false,
    deleteDialog: false
  }),
  components: {
    CalEditEvent,
    CalDeleteEvent
  },
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
  mounted() {
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        this.show = false
      }
    })
  },
  watch: {
    show(val) {
      console.log("trigger")
      if (val) {
        this.startFormatted = this.$moment(this.selectedEvent.start)
        this.endFormatted = this.$moment(this.selectedEvent.end)
        // Handle Height of Toolbar for Multi-line tite
        this.height = this.$refs.title ? this.$refs.title.clientHeight : 64
        // Handle Left and Right Menu to compensate menu overlapping event
        let left = [4, 5, 6]
        this.right = !left.find(x => x == this.startFormatted.day())
      }
    }
  },
  methods: {
    emitEditEvent(createEvent, name, start, end, category, location, color) {
      this.$emit("emitEditEvent",
        createEvent,
        name,
        start,
        end,
        category,
        location,
        color
      );
      this.show = false
    },
    emitDeleteEvent() {
      this.$emit("emitDeleteEvent",
        this.selectedEvent,
      );
      this.show = false
    },
  }
};
</script>

<style scoped>
.card-title {
  word-break: break-word
}
.menu-left {
  margin: 0 -20px
}
.menu-right {
  margin: 0 20px
}
</style>