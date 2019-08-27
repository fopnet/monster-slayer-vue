<template>
  <div id="app">
    <dashboard :playerHealth="playerHealth" :monsterHealth="monsterHealth">
      <controls
        :playerHealth="playerHealth"
        :monsterHealth="monsterHealth"
        :resetHealths="resetAllHealths"
      ></controls>

      <log></log>
    </dashboard>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Log from "./components/Log.vue";
import Controls from "./components/Controls.vue";
import { eventBus } from "./main";

export default {
  data: () => {
    return {
      playerHealth: 100,
      monsterHealth: 100
    };
  },
  components: {
    dashboard: Dashboard,
    controls: Controls,
    log: Log
  },
  methods: {
    resetAllHealths() {
      this.playerHealth = this.monsterHealth = 100;
    }
  },
  created() {
    eventBus.$on("monsterHealthChanged", data => (this.monsterHealth = data));
    eventBus.$on("playerHealthChanged", data => (this.playerHealth = data));
  }
};
</script>
