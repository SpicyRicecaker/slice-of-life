<script lang="ts">
  import { doughnut, days, today } from './stores';
  import { dbPromise, todayPre, todayPost } from './stores';

  const removeData = async (i: number, j: number) => {
    $days[i].data.splice(j, 1);
    $days = $days;
    $doughnut.update();

    const dateIdx = await (await dbPromise)
      .transaction('days', 'readwrite')
      .objectStore('days')
      .index('date');
    // Is there a dataset with todays date?
    const dateCursor = await dateIdx.openCursor(
      IDBKeyRange.bound($todayPre, $todayPost)
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
  }

  .list-item {
    &:hover {
      cursor: default;
      & .remove {
        display: inline-block;
        cursor: pointer;
      }
    }
  }

  .value {
    font-family: 'Courier New', Courier, monospace;
    background-color: lightgray;
    border-radius: 1px;
  }

  .label {
    // text-decoration: underline;
  }

  .remove {
    color: tomato;
    // padding: 0;
    // background: none;
    // border: none;
    // outline: none;
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
        <span class="remove" on:click={() => removeData(i, j)}>x</span>
      </div>
    {/each}
  {/each}
</div>
