<template>
  <div id="app">
    <dashboard
      :playerHealth="playerHealth"
      :monsterHealth="monsterHealth"
      :recordScore="recordScore"
    >
      <controls
        slot="controls"
        :playerHealth="playerHealth"
        :monsterHealth="monsterHealth"
        :resetHealths="resetAllHealths"
      ></controls>

      <log slot="log"></log>
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
      monsterHealth: 100,
      recordScore: 0
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
      this.loadRecord();
    },
    loadRecord() {
      this.$http
        .get("scores.json/?orderBy=%22score%22&limitToLast=1&print=pretty")
        .then(resp => {
          const result = resp.json();
          this.recordScore = result.score;
          console.log("Record is from ", result.id);
        });
    }
  },
  created() {
    eventBus.$on("monsterHealthChanged", data => (this.monsterHealth = data));
    eventBus.$on("playerHealthChanged", data => (this.playerHealth = data));
    this.loadRecord();
  }
};
</script>
