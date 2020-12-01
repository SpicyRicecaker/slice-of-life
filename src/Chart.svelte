<script lang="ts">
  import Chart from 'chart.js';
  import { onMount } from 'svelte';
  import { doughnut, days, options } from './stores/stores';

  let mounted = false;

  // Color palette fk
  const palette = ['#D9E5D6', '#E8B4BC', '#00A7E1', '#EDDEA4', '#32936F'];

  // Listens for changes in days array, creates an array of array of labels and data based off of that
  $: {
    // Reset array
    chartParams.data.labels = [];
    chartParams.data.datasets = [];
    // Loop through array of days
    for (let dayN = 0; dayN < $days.length; dayN++) {
      // Loop through that days data
      const percentages:number[] = [];

      for (let dataN = 0; dataN < $days[dayN].data.length; ++dataN) {
        // Append labels of the day to labels
        chartParams.data.labels.push($days[dayN].data[dataN].x);
        // Append data of the day
        percentages.push($days[dayN].data[dataN].y);
      }
      // Push data to datasets
      chartParams.data.datasets.push({
        label: `Day ${dayN}`,
        data: percentages,
        backgroundColor: palette,
      });
    }

    if (mounted) {
      $doughnut.update();
    }
  }
  // https://coolors.co/6699cc-fff275-ff8c42
  // https://coolors.co/483d3f-058ed9-f4ebd9

  interface dataset {
    label: string;
    data: number[];
    backgroundColor: string[];
  }

  interface chartParameter {
    type: string;
    data: {
      labels: string[];
      datasets: dataset[];
    };
    options: {};
  }

  let chartParams: chartParameter = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [],
    },
    options: $options,
  };

  onMount(async () => {
    let ctx = (document.getElementById(
      'myChart'
    ) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    $doughnut = new Chart(ctx, chartParams);
    mounted = true;
  });
</script>

<canvas id="myChart" />
