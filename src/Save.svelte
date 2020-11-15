<script lang="ts">
  import { onMount } from 'svelte';

  // Load all things from db
  onMount(async () => {
    
  });

  // Write to appdata
  const saveData = () => {};

  const loadData = () => {};
</script>

<button on:click={saveData}>Save</button>
<button on:click={loadData}>Load</button>
