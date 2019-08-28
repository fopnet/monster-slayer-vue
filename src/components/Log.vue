<template>
  <section class="row log" v-if="turns.length > 0">
    <div class="row">
      <div class="col-xs-3 col-xs-offset-3 col-sm-5 col-sm-offset-1">
        <checkButton @changed="isPlayer= $event">Player logs</checkButton>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <checkButton @changed="isMonster= $event">Monster logs</checkButton>
      </div>
    </div>

    <div class="small-12 columns">
      <ul>
        <li
          v-for="(turn,i) in filteredTurns"
          :class="{'monster-turn': !turn.isPlayer, 'player-turn': turn.isPlayer }"
          :key="i"
        >{{ turn.text }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../main";
import { LogFilter } from "../filters/logFilter";

export default {
  mixins: [LogFilter],
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