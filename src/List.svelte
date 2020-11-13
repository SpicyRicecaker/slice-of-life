<script lang="ts">
  import { doughnut, year } from './stores';

  const removeData = (i: number) => {
    $year.days[0].data.splice(i, 1);
    $year = $year;
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
  {#each $year.days[0].data as point, i}
    <div class="list-item">
      <span class="value">{point.y}%</span>
      <span class="label">{point.x}</span>
      <span class="remove" on:click={() => removeData(i)}>x</span>
    </div>
  {/each}
</div>
