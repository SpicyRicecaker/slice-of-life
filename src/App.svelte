<script lang="ts">
  import Chart from 'chart.js';
  import { onMount } from 'svelte';

  // interface dataType {
  //   label: string;
  //   value: number;
  // }

  // const data: dataType[] = [{ label: 'HELLO', value: 0.04 }];

  // const getLabelDataArray = (d: dataType[]) => {
  //   const labelArr: string[] = [];
  //   const valueArr: number[] = [];
  //   for (let i = 0; i < d.length; ++i) {
  //     labelArr.push(d[i].label);
  //     valueArr.push(d[i].value);
  //   }
  //   return [labelArr, valueArr];
  // };

  let inputLabel = '';

  let myChart;

  const addData = () => {
    const index = inputLabel.indexOf(' ');
    const value = inputLabel.substr(0, index); // "72"
    const label = inputLabel.substr(index + 1);

    const match = value.match(/(\d+)%/gi);
    if (match && label !== '') {
      // Push values
      massData.values.push(parseInt(match[0]));
      // Push label
      massData.labels.push(label);
      // Push date
      massData.options.push(new Date());
      massData = massData;
      // Update the graph
      myChart.update();
    }
    // Clear the thing
    inputLabel = '';
  };

  interface massDataType {
    labels: string[];
    values: number[];
    options: any[];
  }

  let massData = {
    labels: ['Sleeping'],
    values: [33],
    options: [],
  };

  onMount(async () => {
    let ctx = (document.getElementById(
      'myChart'
    ) as HTMLCanvasElement).getContext('2d');
    myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: massData.labels,
        datasets: [
          {
            label: '# of Votes',
            data: massData.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  });
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
      'header header' 3rem
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

  .input {
    grid-area: input;
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 1fr);
  }

  #data-input {
    border-radius: 0;
  }

  #add-button {
    border-radius: 0;
  }

  .list {
    grid-area: list;
  }

  .list-item {
    &:hover {
			cursor: default;
      & .remove {
        display: inline-block;
        cursor: pointer;
      }
    }
  }

  .value {
    font-family: 'Courier New', Courier, monospace;
    background-color: lightgray;
    border-radius: 1px;
  }

  .label {
    // text-decoration: underline;
  }

  .remove {
    color: tomato;
    // padding: 0;
    // background: none;
    // border: none;
    // outline: none;
    display: none;
  }

  .header {
    grid-area: header;
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
  <div class="chart-container"><canvas id="myChart" /></div>
  <div class="info">
    <div class="input">
      <input
        id="data-input"
        type="text"
        bind:value={inputLabel}
        on:keydown={(e) => {
          switch (e.code) {
            case 'Enter': {
              e.preventDefault();
              addData();
              break;
            }
            default: {
              break;
            }
          }
				}
			} 
			placeholder="[num]% [label]"/><button id="add-button" on:click={addData}>Add</button>
    </div>
    <div class="list">
      {#each massData.values as point, i}
        <div class="list-item">
          <span class="value">{point}%</span>
          <span class="label">{massData.labels[i]}</span>
          <span class="remove" on:click={() => {
						massData.values.splice(i, 1);
						massData.labels.splice(i, 1);
						massData.options.splice(i, 1);
						massData = massData;
						myChart.update();
					}}>x</span>
        </div>
      {/each}
    </div>
  </div>
  <div class="header" />
</main>
