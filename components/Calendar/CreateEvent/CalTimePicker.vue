<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="menuLabel"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="time"
      full-width
      @click:minute="saveBtn($refs.menu)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
    name: 'CalTimePicker',
    props: ['menuLabel', 'initialTime'],
  data() {
    return {
      time: this.initialTime,
      menu2: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.$emit('passTime', this.time);
    });
  },
  watch: {
    initialTime: function () {
      console.log("watcher called")
      this.time = this.initialTime
    }
  },
  methods: {
    // Save the time and pass it back to the parent
    saveBtn(ref) {
      ref.save(this.time);
      console.log(this.time);
      this.$emit('passTime', this.time);
    },
    reInitialiseTime() {
      this.time = this.initialTime;
    }
  }
};
</script>
