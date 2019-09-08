<template>
  <div>
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

    <footer class="text-center">
      <router-link to="/form">Suppor Form</router-link>
    </footer>
  </div>
</template>

<script>
import Dashboard from "./Dashboard.vue";
import Log from "./Log.vue";
import Controls from "./Controls.vue";
import { eventBus } from "../main";
import { scoresActions } from "../actions/scores.actions";

export default {
  // mixins: [scoresActions],
  computed: {
    recordScore() {
      return this.$store.getters.recordScore;
    }
  },
  data: () => {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      resource: {}
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
      if (this.$store.getters.isAuthenticated) {
        this.$store.dispatch("fetchRecordScore");
      }

      /*
      this.resource
        .fetchRecordScore({ tableName: `scores/${this.store.userId}` })
        .then(resp => {
          const result = resp.json();
          if (result) {
            this.recordScore = result.score;
            console.log("Record is from ", result.id);
          }
        });
      */
    }
  },
  created() {
    eventBus.$on("monsterHealthChanged", data => (this.monsterHealth = data));
    eventBus.$on("playerHealthChanged", data => (this.playerHealth = data));

    this.loadRecord();
  }
};
</script>

<style scoped>
footer {
  padding: 20px 0px;
}
</style>
