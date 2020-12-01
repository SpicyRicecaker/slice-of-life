<script lang="ts">
  import { days } from './stores/stores';
  // import { today } from './stores/dayInformation';
  // The goal is to show time since last modification and in a percentage...
  // also keep in mind the null case for if the person has never modified anything
  let time: number;
  $: {
    for (let i = 0; i < $days.length; ++i) {
      time = Math.floor(
        (new Date().getTime() - $days[i].dateModified.getTime()) / 60000
      );
    }
  }
</script>

{#each $days as day}{time} min since last mod{/each}
