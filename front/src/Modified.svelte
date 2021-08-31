<script lang="ts">
  import { days } from './stores/stores';
  import { time } from './stores/dayInformation';
  // import { today } from './stores/dayInformation';
  // The goal is to show time since last modification and in a percentage...
  // also keep in mind the null case for if the person has never modified anything
  let mod: number;
  $: {
    for (let i = 0; i < $days.length; ++i) {
      mod = Math.floor(
        ($time.getTime() - $days[i].dateModified.getTime()) / 60000
      );
    }
  }
</script>

{#each $days as day}{mod} min since last mod{/each}
