<script lang="ts">
  import { doughnut, year } from './stores';

  let inputLabel = '';
  const addData = () => {
    const index = inputLabel.indexOf(' ');
    const value = inputLabel.substr(0, index); // "72"
    const label = inputLabel.substr(index + 1);

    const match = value.match(/(\d+)%/gi);
    if (match && label !== '') {
      // Push values
      console.log($year.days[0].data);
      $year.days[0].data.push({
        x: label,
        y: parseInt(match[0]),
      });
      $year = $year;
      // Update the graph
      $doughnut.update();
    }
    // Clear the thing
    inputLabel = '';
  };

  const handleKey = (e: KeyboardEvent) => {
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
  };
</script>

<style lang="scss">
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
</style>

<div class="input">
  <input
    id="data-input"
    type="text"
    bind:value={inputLabel}
    placeholder="[num]% [label]"
    on:keydown={(e) => handleKey(e)} /><button
    id="add-button"
    on:click={addData}>Add</button>
</div>
