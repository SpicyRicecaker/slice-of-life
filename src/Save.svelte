<script lang="ts">
  import { daysDb, days, today, todayPre, todayPost } from './stores';

  const pullData = async (currDate: Date) => {
    $days = [];
    // Get date index
    const dateCursor = await daysDb.getCursorFromDateRange(
      $todayPre,
      $todayPost
    );

    // If so, load data
    if (dateCursor) {
      console.log('loading data');
      for await (const date of dateCursor) {
        $days.push(date.value);
      }
    } else {
      console.log('creating sample dataset for today');
      // Otherwise, create a new dataset for today
      const data = { date: currDate, data: [] };
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

  // Load all things from db
  // onMount(async () => pullData($today));

  // Write to appdata
  const saveData = () => {};

  const loadData = () => {};

  const destroyData = async () => {
    let transaction1 = await (await daysDb.getDb()).transaction('days', 'readwrite');
    // First clear store
    let daysStore = await (await transaction1).objectStore('days');
    await daysStore.clear();
    // Then clear out main array
    $days = [];
  };
</script>

<!-- <button on:click={saveData}>Save</button>
<button on:click={loadData}>Load</button> -->
<!-- <button on:click={destroyData}>[Debug] Destroy</button> -->
