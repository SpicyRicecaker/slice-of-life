<script lang="ts">
  import { doughnut, year } from './stores';

  let inputLabel = '';
  const addData = () => {
    const index = inputLabel.indexOf(' ');
    const value = inputLabel.substr(0, index); // "72"
    const label = inputLabel.substr(index + 1);

    const match = value.match(/(\d+)%/gi);
    if (match && label !== '') {
      let lookup = true;
      // Lookup label
      for (let i = 0; i < $year.days[0].data.length; ++i) {
        // if it matches, just add to that obj
        if ($year.days[0].data[i].x.match(new RegExp(label, 'i'))) {
          $year.days[0].data[i].y += parseInt(value);
          lookup = !lookup;
          break;
        }
      }
      if (lookup) {
        // Otherwise just push values
        $year.days[0].data.push({
          x: label,
          y: parseInt(match[0]),
        });
      }
    }
    $year = $year;
    // Update the graph
    $doughnut.update();
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
