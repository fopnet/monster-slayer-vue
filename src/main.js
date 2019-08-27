import Vue from "vue";
import App from "./App.vue";

export const eventBus = new Vue({
  methods: {
    monsterHealthChange(data) {
      this.$emit("monsterHealthChanged", data);
    },
    playerHealthChange(data) {
      this.$emit("playerHealthChanged", data);
    },
    resetTurn() {
      this.$emit("resetTurn");
    },
    addTurn(data) {
      this.$emit("turnAdded", data);
    },
  },
});

new Vue({
  el: "#app",
  render: h => h(App),
});
