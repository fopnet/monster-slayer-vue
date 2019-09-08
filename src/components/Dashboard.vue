<template>
  <div>
    <p v-if="email">Logged User {{email}}</p>
    <h3>The record score is {{recordScore}}</h3>
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

    <slot name="controls"></slot>
    <slot name="log"></slot>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  },
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
    },
    recordScore: {
      type: Number
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

h3 {
  text-align: center;
  color: red;
  border: 1px solid red;
  padding: 5px;
}
.row {
  margin: auto;
}
</style>