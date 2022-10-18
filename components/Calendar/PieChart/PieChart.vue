<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';


export default {

  data: () => ({
    chart: null,
    chartData: {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderColor: 'rgb(255, 255, 255)',
            data: []
          }
        ]
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  }),

  props: {
    events: Array
  },
  computed: {
    calendar: {
      get() {
        return this.$store.state.calendar;
      },
    }
  },
  watch: {
    calendar(val) {
      this.getEventsPerWeek();
    },
    events: {
      handler(val) {
        this.getEventsPerWeek();
      },
      deep: true
    }


  },
  mounted() {
    const ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx, this.chartData);
  },
  created() {
    this.getEventsPerWeek();
  },
  methods: {
    recalculateTable() {
      this.chart.update();
      console.log(this.chart);

    },

    getEventsPerWeek() {
      const startWeek = this.$moment(this.calendar, "YYYY-MM-DD").startOf('isoWeek').valueOf()
      const endWeek = this.$moment(this.calendar, "YYYY-MM-DD").endOf('isoWeek').valueOf()
      const eventsCurrentWeek = this.events.filter(x => x.start >= startWeek && x.start <= endWeek)

      let result = eventsCurrentWeek.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
      }, Object.create(null));


      var ids = Object.keys(result);
      this.chartData.data.labels = ids

      let eventData = [];
      console.log(result);
      ids.forEach(element => {
        var count = 0;
        for(let i = 0; i < result[element].length; i++){
          count += result[element][i].end - result[element][i].start

        }
        let hours = (count / (1000 * 60 * 60)).toFixed(1);
        eventData.push(hours);
      });

      this.chartData.data.datasets[0].data = eventData;

      // loop all elements within ids
      // loop all the events within ids
      if(this.chart){
        this.recalculateTable();
      }
      return ids
    }
  }
}
</script>
