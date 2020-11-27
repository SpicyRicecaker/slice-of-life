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
      title: 'Save Data',
      buttonLabel: 'Save',
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

  const loadData = async () => {
    // Prompt to choose file probably
    const filePath = await ipcRenderer.invoke('showOpenDialog', {
      title: 'Load File',
      buttonLabel: 'Load',
      filters: [
        {
          name: 'Javascript Object Notation',
          extensions: ['json'],
        },
      ],
    });
    if (!filePath.canceled) {
      try {
        // Read the json file
        const content = await fs.readFile(filePath.filePaths[0], 'utf8');
        // Turn it into an actual object
        const obj = JSON.parse(content);
        // Clear the object store
        await daysDb.clear('days');
        // Push the object into the object store
        for (let i = 0; i < obj.length; ++i) {
          obj[i].date = new Date(obj[i].date);
          obj[i].dateCreated = new Date(obj[i].date);
          obj[i].dateModified = new Date(obj[i].date);
          for (let point = 0; point < obj[i].data.length; ++point) {
            obj[i].data[point].dateCreated = new Date(
              obj[i].data[point].dateCreated
            );
            obj[i].data[point].dateModified = new Date(
              obj[i].data[point].dateModified
            );
          }
          await daysDb.insertObjectInDatabase(obj[i]);
        }
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      console.log('You canceled lol');
    }
  };
</script>

<!-- <button on:click={saveData}>Save</button>
<!-- <button on:click={updateStuff}>Update Stuff</button>
<button on:click={destroyData}>[Debug] Clear Today</button> -->
<button on:click={exportData}>Export</button>
<button on:click={loadData}>Import</button>
