<template>
  <section class="row">
    <div class="small-6 columns">
      <h1 class="text-center">YOU</h1>
      <div class="healthbar">
        <div
          class="healthbar text-center"
          style="background-color: green; margin: 0; color: white;"
          :style="{width: playerHealth + '%'}"
        >{{ playerHealth }}</div>
      </div>
    </div>
    <div class="small-6 columns">
      <h1 class="text-center">MONSTER</h1>
      <div class="healthbar">
        <div
          class="healthbar text-center"
          style="background-color: green; margin: 0; color: white;"
          :style="{width: monsterHealth + '%'}"
        >{{ monsterHealth }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../main";

export default {
  props: {
    monsterHealth: {
      type: Number,
      rerquired: true,
      default: 100
    },
    playerHealth: {
      type: Number,
      rerquired: true,
      default: 100
    }
  }
};
</script>

<style scoped>
.healthbar {
  width: 80%;
  height: 40px;
  background-color: #eee;
  margin: auto;
  transition: width 500ms;
}
</style>