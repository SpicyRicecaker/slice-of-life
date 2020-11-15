<script lang="ts">
  import { doughnut, days } from './stores';

  const removeData = (i: number, j: number) => {
    $days[i].data.splice(j, 1);
    $days = $days;
    $doughnut.update();
  };
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
