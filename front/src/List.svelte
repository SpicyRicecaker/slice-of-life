<script lang="ts">
  import { doughnut, days } from './stores/stores';
  import { today, time } from './stores/dayInformation';
  import { daysDb } from './stores/database';

  const removeData = async (i: number, j: number) => {
    $days[i].data.splice(j, 1);
    $days = $days;
    $doughnut.update();

    const dateCursor = await daysDb.getCursorFromDateRange(
      $today.getMorning(),
      $today.getNight()
    );
    // Update it
    if (dateCursor !== null) {
      for await (const date of dateCursor) {
        date.value.data.splice(j, 1);
        dateCursor.update(date.value);
      }
    }
  };

  // If the length of data for today is nothing
  let noData = false;
  $: {
    const l = $days.length;
    if (l > 0) {
      noData = $days[l - 1].data.length === 0;
    }
  }
</script>

<style lang="scss">
  .list {
    grid-area: list;
    // Make every list item extend down
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .list-item {
    padding: 0.5rem;
    // Space out percentage, label, and other tags!
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 5fr) auto;
    // align-items: baseline;
    transition: 1s;
    gap: 1rem;
    &:hover {
      background-color: #f1c23250;
      cursor: default;

      & .remove {
        opacity: 1;
        cursor: pointer;
      }

      & .extra {
        opacity: 1;
      }
    }
    // Inspiration for separators from this site: https://codepen.io/equinusocio/pen/OqpBKJ
    & + .list-item {
      border-top: 1px dashed #2b2b2b40;
    }
  }

  .value {
    // padding: 0.5rem;
    justify-self: right;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 2rem;
    color: #2b2b2bb9;
    // font-family: 'Courier New', Courier, monospace;
    // background-color: ;
    align-self: baseline;
  }

  .label {
    font-size: 1.2rem;
    align-self: center;
  }

  .extra {
    align-self: center;
    display: flex;
    flex-direction: column;
    color: #2b2b2b40;
    transition: 0.2s;
    opacity: 0;
    & * {
      flex: 1;
    }
    // & *:not(:last-child) {
    //   flex: 1;
    // }
  }

  .remove {
    user-select: none;
    padding: 0.5rem;
    transition: 0.2s;
    opacity: 0;
    align-self: center;
    // &:hover {
    // background-color: #e0666699;
    // }
  }
</style>

<div class="list">
  {#if noData}
    <div><span>No entries yet!</span> - <span style="color: gray;">Last modified checked at {$time.toLocaleString()}</span></div>
  {/if}
  {#each $days as day, i}
    {#each day.data as point, j}
      <div class="list-item">
        <span class="value">{point.y}<span
            style="font-size: 1rem">%</span></span>
        <span class="label">{point.x}</span>
        <span class="extra">
          <div>
            <span
              style="color: #93c47d40">&bull;</span>{point.dateCreated.toLocaleTimeString()}
          </div>
          {#if point.dateModified !== point.dateCreated}
            <div>
              <span
                style="color: #e0666640">&bull;</span>{point.dateModified.toLocaleTimeString()}
            </div>
          {/if}
        </span>
        <span class="remove" on:click={() => removeData(i, j)}>
          <svg
            id="Hello"
            height="1rem"
            viewBox="0 0 512 512"
            width="1rem"
            xmlns="http://www.w3.org/2000/svg"><g>
              <path
                d="m256 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z" />
              <path
                d="m346 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z" />
              <path
                d="m166 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z" />
              <path
                d="m46 150h45v347c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15v-347h45c8.284 0 15-6.716 15-15s-6.716-15-15-15h-15v-45c0-8.284-6.716-15-15-15h-105v-45c0-8.284-6.716-15-15-15h-120c-8.284 0-15 6.716-15 15v45h-105c-8.284 0-15 6.716-15 15v45h-15c-8.284 0-15 6.716-15 15s6.716 15 15 15zm345 332h-270v-332h270zm-180-452h90v30h-90zm-120 60h330v30h-330z" />
            </g></svg>
        </span>
      </div>
    {/each}
  {/each}
</div>
