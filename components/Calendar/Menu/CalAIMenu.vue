<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    :activator="activator"
    offset-x
    right
    max-width="60px"
    style
  >
    <!-- <v-card color="grey darken-3" width="70px" flat> -->
      <!-- <v-card-text> -->
        <!-- <v-container v-if="selectedEvent"> -->
          <v-btn @click="accept">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn @click="reject">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        <!-- </v-container> -->
      <!-- </v-card-text> -->
    <!-- </v-card> -->
  </v-menu>
</template>

<script>
export default {
  name: "CalAIMenu",
  props: ["value", "activator", "selectedEvent"],
  data: () => ({
    height: 100,
    startFormatted: null,
    endFormatted: null,
    timePeriod: null,
    editDialog: false,
    deleteDialog: false
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
      }
    }
  },
  methods: {
    accept() {
      this.$emit("accept", this.selectedEvent);
      this.show = false;
    },
    reject() {
      this.$emit("reject", this.selectedEvent);
      this.show = false;
    }
  }
};
</script>

<style scoped>
.card-title {
  word-break: break-word
}
</style>