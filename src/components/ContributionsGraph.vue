<template>
  <div class="contributions-graph">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'ContributionsGraph',
  mounted() {
    const randomScalingFactor = () => Math.floor(Math.random() * (100 + 100)) - 100;
    const chartColors = {
      red:    'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green:  'rgb(75, 192, 192)',
      blue:   'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey:   'rgb(201, 203, 207)',
    };
    const chartData = {
      labels:   ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type:        'line',
        label:       'Dataset 1',
        borderColor: chartColors.blue,
        borderWidth: 2,
        fill:        false,
        data:        [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
      }, {
        type:            'bar',
        label:           'Dataset 2',
        backgroundColor: chartColors.red,
        data:            [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        borderColor: 'white',
        borderWidth: 2,
      }, {
        type:            'bar',
        label:           'Dataset 3',
        backgroundColor: chartColors.green,
        data:            [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
      }],
    };
    const ctx = document.getElementById('canvas').getContext('2d');
    window.myMixedChart = new Chart(ctx, {
      type:    'bar',
      data:    chartData,
      options: {
        responsive: true,
        title:      {
          display: true,
          text:    'Chart.js Combo Bar Line Chart',
        },
        tooltips: {
          mode:      'index',
          intersect: true,
        },
      },
    });
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

canvas {
  width: 100%;
}
</style>
