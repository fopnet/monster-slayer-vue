<template>
  <section class="row log" v-if="turns.length > 0">
    <div class="small-12 columns">
      <ul>
        <li
          v-for="(turn,i) in turns"
          :class="{'monster-turn': !turn.isPlayer, 'player-turn': turn.isPlayer }"
          :key="i"
        >{{ turn.text }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../main";

export default {
  data: () => {
    return {
      turns: []
    };
  },
  created() {
    eventBus.$on("turnAdded", data => this.turns.unshift(data));
    eventBus.$on("resetTurn", () => (this.turns = []));
  }
};
</script>

<style scoped>
.log ul {
  list-style: none;
  font-weight: bold;
  text-transform: uppercase;
}

.log ul li {
  margin: 5px;
}

.log ul .player-turn {
  color: blue;
  background-color: #e4e8ff;
}

.log ul .monster-turn {
  color: red;
  background-color: #ffc0c1;
}

.turn {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
}

.controls,
.log {
  margin-top: 30px;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 3px 6px #ccc;
}
</style>