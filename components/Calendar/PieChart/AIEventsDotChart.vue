<template>
  <v-container>
    <canvas id="EventDotChart"></canvas>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data: (vm) => ({
    chart: null,
    chartData: {
      type: "scatter",
      data: {
        datasets: [{
          label: 'Probability of Events',
          // [{x: ..., y: ...}]
          data: [],
          backgroundColor: []
        },
        ]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 3
          }
        },  
        plugins: {
          legend: {
            title: {
              display: true,
              text: 'Recommended Events',
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][context.parsed.x] + ' ' + vm.$moment.utc(context.parsed.y).format('HH:mm');
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 6,
            ticks: {
              callback: function(value) {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][value];
              }
            }
          },
          y: {
            reverse: true,
            min: 0,
            max: 86399999,
            ticks: {
              callback: function(value) {
                return vm.$moment.utc(value).format('HH:mm');
              }
            }
          }
        },
      },
    },
  }),
  props: {
    recommendedEvents: Array
  },
  watch: {
    recommendedEvents: {
      handler() {
        this.getRecommendedEventsPerWeek();
      },
      deep: true
    }
  },
  mounted() {
    const ctx = document.getElementById("EventDotChart");
    ctx.width="240"
    ctx.height="240"
    this.chart = new Chart(ctx, this.chartData);
  },
  created() {
    this.getRecommendedEventsPerWeek();
  },
  methods: {
    recalculateChart() {
      if (this.chart)
        this.chart.update();
    },
    getRecommendedEventsPerWeek() {
      console.log(this.recommendedEvents)
      if (this.recommendedEvents) {
        let arrRecommended = []
        for (let i = 0; i < 7; i++) {
          let arrTime = []
          if (this.recommendedEvents[i].length > 0) {
            let startDay = this.$moment(this.recommendedEvents[i][0].start).startOf('day').valueOf()
            for (let t = 0; t < this.recommendedEvents[i].length; t++) {
              arrTime.push({start: this.recommendedEvents[i][t].start - startDay, color: this.getColor(this.recommendedEvents[i][t].probability)})
            }
          }
          arrRecommended.push(arrTime)
        }
        // console.log(arrRecommended)
        this.chartData.data.datasets[0].data = arrRecommended.map((x, i) => x.map(t => ({x: i, y: t.start}))).flat()
        this.chartData.data.datasets[0].backgroundColor = arrRecommended.map((x, i) => x.map(t => (t.color))).flat()
        this.recalculateChart()
      }
    },
    getColor(value) {
      //value from 1 to 0
      var hue = (value * 120).toString(10);
      return ["hsl(", hue, ",100%,50%)"].join("");
    }
  },
};
</script>
