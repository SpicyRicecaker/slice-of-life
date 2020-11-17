<script lang="ts">
  import { onMount } from 'svelte';
  import { dbPromise, days, today, todayPre, todayPost } from './stores';

  // Load all things from db
  onMount(async () => {
    // Get date index
const dateIdx = await (await dbPromise)
      .transaction('days')
      .objectStore('days')
      .index('date');

    // Is there a dataset with todays date?
    const dateCursor = await dateIdx.openCursor(
      IDBKeyRange.bound($todayPre, $todayPost)
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
      const data = { date: $today, data: [] };
      // Update the database
      await (await dbPromise).add('days', data);
      // And the current array
      $days.push(data);
    }
    $days = $days;
  });

  // Write to appdata
  const saveData = () => {};

  const loadData = () => {};

  const destroyData = async () => {
    let transaction1 = await (await dbPromise).transaction('days', 'readwrite');
    // First clear store
    let daysStore = await (await transaction1).objectStore('days');
    await daysStore.clear();
    // Then clear out main array
    $days = [];
  };
</script>

<button on:click={saveData}>Save</button>
<button on:click={loadData}>Load</button>
<button on:click={destroyData}>Destroy</button>
