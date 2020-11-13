<script lang="ts">
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { doughnut, year, options } from './stores';

  onMount(async () => {
    let ctx = (document.getElementById(
      'myChart'
    ) as HTMLCanvasElement).getContext('2d');
    $doughnut = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'day 1',
            data: $year.days[0].data,
          },
        ],
      },
      options: $options,
    });
  });
</script>

<canvas id="myChart" />
