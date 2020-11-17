<script lang="ts">
  import { today } from './stores';

  $: formatDate = $today.toLocaleDateString();

  const changeDateByOne = (pm: number) => {
    $today.setDate($today.getDate() + pm);
    $today = $today;
  };
</script>

<style lang="scss">
  span {
    display: grid;
    align-items: center;
    justify-items: center;
    // color: gray;
    transition: 1s;
    &:hover {
      background-color: #fbfbfb;
      cursor: pointer;
      & .left {
        cursor: pointer;
        transform: translateX(-100%);
      }
      & .right {
        cursor: pointer;
        transform: translateX(100%);
      }
    }
  }

  .left,
  .right {
    transition: 0.2s;
    user-select: none;
  }

  .date {
    user-select: none;
  }
</style>

<span on:click={() => changeDateByOne(-1)}><span
    class="left">&#10094;</span></span>
<span class="date">{formatDate}</span>
<span on:click={() => changeDateByOne(1)}><span
    class="right">&#10095;</span></span>
