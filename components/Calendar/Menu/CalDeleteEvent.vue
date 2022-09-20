<template>
  <v-dialog v-model="show" width="300">
    <v-card>
      <v-card-title>Delete Event</v-card-title>
      <v-card-text>
        <p>Are you sure you want to delete this event?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="show = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="emitDeleteEvent">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CalDelete",
  props: ["value"],
  data: () => ({
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
  methods: {
    emitDeleteEvent() {
      this.$emit("emitDeleteEvent");
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