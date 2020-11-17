<script lang="ts">
  import Chart from './Chart.svelte';
  import Input from './Input.svelte';
  import List from './List.svelte';
  import Save from './Save.svelte';
  import Date from './Date.svelte';
</script>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
  }
  main {
    // Max out content
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: grid;
    // Display grid is always in string
    grid-template:
      'header other' 3rem
      'chart info' minmax(0, 10fr)
      / minmax(0, 1fr) minmax(0, 1fr);
  }

  .chart-container {
    grid-area: chart;
    align-self: center;
  }

  .info {
    grid-area: info;
    display: grid;
    grid-template:
      'input' minmax(0, 1fr)
      'list' minmax(0, 9fr);
    padding: 1rem;
  }

  .header {
    grid-area: header;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    justify-items: stretch;
    align-items: stretch;
  }

  /* h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  } */

  @media (max-width: 991px) {
    main {
      display: flex;
      flex-direction: column;
    }
  }
</style>

<main>
  <div class="header">
    <Date/>
  </div>
  <div class="chart-container">
    <Chart />
  </div>
  <div class="info">
    <Input />
    <List />
    <Save />
  </div>
  <!-- <div class="header" /> -->
</main>
