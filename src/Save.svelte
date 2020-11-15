<script lang="ts">
  import { onMount } from 'svelte';
  import { dbPromise, days } from './stores';

  // Load all things from db
  onMount(async () => {
    let transaction1 = await (await dbPromise).transaction('days', 'readwrite');
    // First clear store
    let daysStore = await (await transaction1).objectStore('days');
    await daysStore.clear();
    // Create store?
    await (await dbPromise).add('days', {
      date: new Date('2019-01-01'),
      data: [{ x: 'Sleep', y: 33 }],
    });
    let transaction2 = await (await dbPromise).transaction('days');
    // Loop through all days
    for await (const cursor of transaction2.store) {
      console.log(cursor.value);
      $days.push(cursor.value);
    }
    $days = $days;
    console.log($days);
  });

  // Write to appdata
  const saveData = () => {};

  const loadData = () => {};
</script>

<button on:click={saveData}>Save</button>
<button on:click={loadData}>Load</button>
