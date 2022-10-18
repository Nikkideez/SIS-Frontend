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
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        borderColor: 'rgb(255, 255, 255)',
                        data: [40, 20, 12, 39, 10, 40, 39]
                    }
                ]
            }
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }),
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
  