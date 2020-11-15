<script lang="ts">
  import { onMount } from 'svelte';
  import { dbPromise, days, today } from './stores';

  // Load all things from db
  onMount(async () => {
    // Add dummy data
    await (await dbPromise).add('days', {
      date: new Date('2019-01-01'),
      data: [{ x: 'Sleep', y: 33 }],
    });
    let transaction2 = await (await dbPromise).transaction('days');
    // Loop through database and add data for all days
    for await (const cursor of transaction2.store) {
      $days.push(cursor.value);
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
