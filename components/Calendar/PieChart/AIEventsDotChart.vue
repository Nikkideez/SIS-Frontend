<template>
  <v-container>
    <canvas id="EventDotChart"></canvas>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data: () => ({
    chart: null,
    chartData: {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Sleep",
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10
            }, {
              x: 10,
              y: 5
            }, {
              x: 0.5,
              y: 5.5
            }],
            backgroundColor: 'rgb(255, 99, 132)'
          },
        ],
      },
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    const ctx = document.getElementById("EventDotChart");
    ctx.width="240"
    ctx.height="240"
    this.chart = new Chart(ctx, this.chartData);
  },
  methods: {
    recalculateTable() {
      this.chart.update();
    },
  },
};
</script>
