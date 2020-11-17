<script lang="ts">
  import { doughnut, days, today } from './stores';
  import { daysDb, todayPre, todayPost } from './stores';

  const removeData = async (i: number, j: number) => {
    $days[i].data.splice(j, 1);
    $days = $days;
    $doughnut.update();

    const dateCursor = await daysDb.getCursorFromDateRange(
      $todayPre,
      $todayPost
    );
    // Update it
    for await (const date of dateCursor) {
      date.value.data.splice(j, 1);
      dateCursor.update(date.value);
    }
  };

  // Today len
  let noPoint = false;
  $: {
    const l = $days.length;
    if (l > 0) {
      noPoint = $days[l - 1].data.length === 0;
    }
  }
</script>

<style lang="scss">
  .list {
    grid-area: list;
    // Make every list item extend down
    display: flex;
    flex-direction: column;
  }

  .list-item {
    // height: .5rem;
    // box-shadow: 0rem 0.1rem 0.3rem 0.1rem #;
    padding: 0.5rem;
    &:hover {
      cursor: default;
      & .remove {
        display: inline-block;
        cursor: pointer;
      }
    }
    // Inspiration for separators from this site: https://codepen.io/equinusocio/pen/OqpBKJ
    & + .list-item {
      border-top: 1px dashed #2b2b2b40;
    }
  }

  .value {
    font-family: 'Courier New', Courier, monospace;
    background-color: lightgray;
    border-radius: 1px;
  }

  .label {
  }

  .remove {
    color: tomato;
    display: none;
  }
</style>

<div class="list">
  {#if noPoint}
    <div>No data for today, {$today.toLocaleString()}!</div>
  {/if}
  {#each $days as day, i}
    {#each day.data as point, j}
      <div class="list-item">
        <span class="value">{point.y}%</span>
        <span class="label">{point.x}</span>
        {#if point.dateCreated}
          <span class="label">{point.dateCreated.toLocaleTimeString()}</span>
        {/if}
        {#if point.dateModified}
          <span class="label">{point.dateModified.toLocaleTimeString()}</span>
        {/if}
        <span class="remove" on:click={() => removeData(i, j)}>x</span>
      </div>
    {/each}
  {/each}
</div>
