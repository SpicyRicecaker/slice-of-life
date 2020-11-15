<script lang="ts">
  import { doughnut, days } from './stores';
  import Datepicker from 'svelte-calendar';

  let inputLabel = '';
  const addData = () => {
    const index = inputLabel.indexOf(' ');
    const value = inputLabel.substr(0, index); // "72"
    const label = inputLabel.substr(index + 1);
    
    const currentDay = new Date();

    const match = value.match(/(\d+)%/gi);
    if (match && label !== '') {
      let noMatch = true;
      // Lookup label
      for (let i = 0; i < $days.length; ++i) {
        for (let j = 0; j < $days[i].data.length; ++j) {
          // if it matches, just add to that obj
          if ($days[i].data[j].x.match(new RegExp(label, 'i'))) {
            $days[i].data[j].y += parseInt(value);
            noMatch = !noMatch;
            break;
          }
        }
      }
      if (noMatch) {
        // Get day at today
        const dayToday = 0;
        // Otherwise just push values
        $days[dayToday].data.push({
          x: label,
          y: parseInt(match[0]),
        });
      }
    }
    $days = $days;
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
  <Datepicker />
</div>
