<script lang="ts">
  import { doughnut, days, dbPromise, todayPre, todayPost } from './stores';
  import Datepicker from 'svelte-calendar';

  let inputLabel = '';
  const addData = async () => {
    // Parsing input
    const index = inputLabel.indexOf(' ');
    const value = inputLabel.substr(0, index); // "72"
    const label = inputLabel.substr(index + 1);

    const match = value.match(/(\d+)%/gi);
    // If we get valid input
    if (match && label !== '') {
      // First check if we already have the label in the db
      let noMatch = true;
      // Lookup label
      for (let i = 0; i < $days.length; ++i) {
        for (let j = 0; j < $days[i].data.length; ++j) {
          // if it matches, just add to that obj
          if ($days[i].data[j].x.match(new RegExp(label, 'i'))) {
            // Update array
            $days[i].data[j].y += parseInt(value);
            noMatch = !noMatch;
            // Update database
            // Load new date index
            const dateIdx = await (await dbPromise)
              .transaction('days', 'readwrite')
              .objectStore('days')
              .index('date');
            // Is there a dataset with todays date?
            const dateCursor = await dateIdx.openCursor(
              IDBKeyRange.bound($todayPre, $todayPost)
            );
            // Update it
            for await (const date of dateCursor) {
              console.log(date.value.data[j]);
              date.value.data[j].y += parseInt(value);
              console.log(date.value.data[j]);
              dateCursor.update(date.value);
            }
            break;
          }
        }
      }
      // If there is no match, then I guess we just have to push
      if (noMatch) {
        // Get day at today
        const dayToday = 0;
        // Otherwise just push values
        $days[dayToday].data.push({
          x: label,
          y: parseInt(match[0]),
        });
        const dateIdx = await (await dbPromise)
          .transaction('days', 'readwrite')
          .objectStore('days')
          .index('date');
        // Is there a dataset with todays date?
        const dateCursor = await dateIdx.openCursor(
          IDBKeyRange.bound($todayPre, $todayPost)
        );
        // Update it
        for await (const date of dateCursor) {
          date.value.data.push({x: label, y: parseInt(match[0])});
          dateCursor.update(date.value);
        }
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
</div>
