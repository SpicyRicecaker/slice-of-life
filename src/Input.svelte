<script lang="ts">
  import { doughnut, days } from './stores/stores';
  import { daysDb } from './stores/database';
  import { today } from './stores/dayInformation';

  interface point {
    x: string;
    y: number;
    dateCreated: Date;
    dateModified: Date;
  }

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
            let t = new Date();
            // Update array
            $days[i].data[j].y += parseInt(value);
            $days[i].data[j].dateModified = t;
            noMatch = !noMatch;
            // Update database
            const dateCursor = await daysDb.getCursorFromDateRange(
              $today.getMorning(),
              $today.getNight()
            );
            if (dateCursor !== null) {
              for await (const date of dateCursor) {
                date.value.data[j].y += parseInt(value);
                date.value.data[j].dateModified = t;
                date.value.dateModified = t;
                dateCursor.update(date.value);
              }
              break;
            }
          }
        }
      }
      // If there is no match, then I guess we just have to push
      if (noMatch) {
        // Get day at today
        const dayToday = 0;
        const t = new Date();
        // Otherwise just push values
        const newPoint: point = {
          x: label,
          y: parseInt(match[0]),
          dateCreated: t,
          dateModified: t,
        };

        $days[dayToday].data.push(newPoint);

        const dateCursor = await daysDb.getCursorFromDateRange(
          $today.getMorning(),
          $today.getNight()
        );
        // Update it
        if (dateCursor !== null) {
          for await (const date of dateCursor) {
            date.value.data.push(newPoint);
            date.value.dateModified = t;
            dateCursor.update(date.value);
          }
        }
      }
      $days = $days;
      // Update the graph
      $doughnut.update();
      // Clear the thing
      inputLabel = '';
    }
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
    // Make the input box much bigger than the button
    display: grid;
    align-items: stretch;
    justify-items: stretch;
    grid-template-columns: minmax(0, 5fr) minmax(0, 1fr);
    border: 1px solid #2b2b2b40;
    // border-radius:1rem;
    margin: 0;
  }

  #data-input {
    border-radius: 0;
    border: none;
    outline: none;
  }

  #add-button {
    border-radius: 0;
    border: none;
    outline: none;
  }
</style>

<div class="input">
  <input
    id="data-input"
    type="text"
    bind:value={inputLabel}
    placeholder="[num]% [label]"
    on:keydown={(e) => handleKey(e)} />
  <button id="add-button" on:click={addData}>+</button>
</div>
