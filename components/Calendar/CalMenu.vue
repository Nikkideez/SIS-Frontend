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
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <!-- <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title> -->
      <v-row>
      <v-card-title class="card-title" style="word-break: break-word" ref="title">{{selectedEvent.name}}</v-card-title>
      
      </v-row><v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <span v-html="selectedEvent.details"></span>
      <v-container>
        {{selectedEvent}}
        {{startFormatted}}
        {{endFormatted}}
        {{timePeriod}}
        <p></p>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="closeDialogue"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</v-menu>
</template>

<script>
export default {
  name: "CalDialogue",
  props: ["value", "activator", "selectedEvent", "closeDialogue"],
  data: () => ({
    height: 100,
    right: true,
    startFormatted: null,
    endFormatted: null,
    timePeriod: null,
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
      console.log("trigger")
      if (val) {
        this.startFormatted = new Date(this.selectedEvent.start)
        this.endFormatted = new Date(this.selectedEvent.end)
        console.log(this.startFormatted.getDay())
        // Handle Height of Toolbar for Multi-line tite
        this.height = this.$refs.title ? this.$refs.title.clientHeight : 64
        // Handle Left and Right Menu to compensate menu overlapping event
        let left = [4, 5, 6]
        this.right = !left.find(x => x == this.startFormatted.getDay())
      }
    }
  },
  methods: {
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