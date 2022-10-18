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
                labels: ['Sleep', 'Fitness', 'Work', 'Leisure', 'Education'],
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
                        data: [40, 20, 12, 39, 10]
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
    mounted() {
        const ctx = document.getElementById('myChart');
        this.chart = new Chart(ctx, this.chartData);
    },
    methods: {
        recalculateTable() {
            this.chart.update();
            console.log(this.chart);
        }
    }
}
</script>
  