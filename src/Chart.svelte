<script lang="ts">
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { doughnut, year, options } from './stores';

  let mounted = false;

  $: {
    [
      chartParams.data.labels,
      chartParams.data.datasets[0].data,
    ] = $year.days[0].data.reduce(
      (total, obj) => [
        [...total[0], obj.x],
        [...total[1], obj.y],
      ],
      [[], []]
    );
    if (mounted) {
      $doughnut.update();
    }
  }

  let chartParams = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          label: 'day 1',
          data: [],
        },
      ],
    },
    options: $options,
  };

  onMount(async () => {
    let ctx = (document.getElementById(
      'myChart'
    ) as HTMLCanvasElement).getContext('2d');

    $doughnut = new Chart(ctx, chartParams);
    mounted = true;
  });
</script>

<canvas id="myChart" />
