import Vue from "vue";
// import App from "./App.vue";
import App from "./components/Form.vue";

Vue.directive("highlight", {
  bind(el, binding, vnode) {
    // el.style.backgroundColor = 'green';
    // el.style.backgroundColor = binding.value;
    let delay = 0;
    if (binding.modifiers.delayed) {
      delay = 3000;
    }
    setTimeout(() => {
      if (binding.args) {
        el.style[args] = binding.value;
      } else {
        el.style.backgroundColor = binding.value;
      }
    }, delay);
  },
});

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
