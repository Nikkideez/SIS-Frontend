<template>
  <v-card
    flat
    tile
    height="342"
  >
    <v-window
      v-model="step"
    >
      <v-window-item
        :value="0"
      >
        <v-date-picker v-model="calendar" no-title></v-date-picker>
      </v-window-item>
      <v-window-item
        :value="1"
      >
        <PieChart />
      </v-window-item>
      <v-window-item
        :value="2"
      >
        <AIEventsDotChart />
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="step"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        text
        @click="next"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import PieChart from "../PieChart/PieChart.vue"
  import AIEventsDotChart from "../PieChart/AIEventsDotChart.vue"

  export default {
    data: () => ({
      step: 0,
      length: 3,
    }),

    components: {
      PieChart,
      AIEventsDotChart
    },

    computed: {
      calendar: {
        get() {
          return this.$store.state.calendar;
        },
        set(val) {
          this.$store.commit("SET_CALENDAR", val);
        },
      }
    },

    methods: {
      next () {
        this.step = this.step + 1 === this.length
          ? 0
          : this.step + 1
      },
      prev () {
        this.step = this.step - 1 < 0
          ? this.length - 1
          : this.step - 1
      },
    },
  }
</script>

<style scoped>

</style>