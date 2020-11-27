<script lang="ts">
  import { daysDb, days, today, todayPre, todayPost } from './stores';
  import { promises as fs } from 'fs';
  import { ipcRenderer } from 'electron';

  const pullData = async (currDate: Date) => {
    $days = [];
    // Get date index
    const dateCursor = await daysDb.getCursorFromDateRange(
      $todayPre,
      $todayPost
    );

    // If so, load data
    if (dateCursor) {
      for await (const date of dateCursor) {
        $days.push(date.value);
      }
    } else {
      const t = new Date();
      // Otherwise, create a new dataset for today
      const data = {
        date: currDate,
        dateCreated: t,
        dateModified: t,
        data: [],
      };
      // Update the database
      await daysDb.insertObjectInDatabase(data);
      // And the current array
      $days.push(data);
    }
    $days = $days;
  };

  $: {
    pullData($today);
  }

  // Write to appdata
  // const saveData = () => {};

  const updateStuff = async () => {
    const dateCursor = await daysDb.getCursorFromDateRange(
      $todayPre,
      $todayPost
    );
    for await (const date of dateCursor) {
      date.value['dateCreated'] = new Date();
      date.value['dateModified'] = new Date();
      dateCursor.update(date.value);
    }
  };

  const destroyData = async () => {
    // Update database
    const dateCursor = await daysDb.getCursorFromDateRange(
      $todayPre,
      $todayPost
    );
    for await (const date of dateCursor) {
      date.delete();
    }
    // Then clear out main array
    $days = [];
  };

  const exportData = async () => {
    const cursor = await daysDb.getCursor();
    const obj = [];

    for await (const point of cursor) {
      obj.push(point.value);
    }

    const filePath = await ipcRenderer.invoke('showSaveDialog', {
      title: 'Save File',
      buttonLabel: 'Save File',
      filters: [
        {
          name: 'Javascript Object Notation',
          extensions: ['json'],
        },
      ],
    });
    if (!filePath.canceled) {
      fs.writeFile(filePath.filePath, await JSON.stringify(obj));
    } else {
      console.log('You canceled the prompt !!');
    }
  };
</script>

<!-- <button on:click={saveData}>Save</button>
<!-- <!-- <button on:click={saveData}>Save</button> -->
<!-- <button on:click={updateStuff}>Update Stuff</button>
<button on:click={destroyData}>[Debug] Clear Today</button> -->
<button on:click={exportData}>Export</button>
