import Vue from "vue";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";
import CheckButton from "./components/CheckButton.vue";
import { fromJSON, fromJSONList } from "./utility/util";
import store from "./store";
import axios from "axios";
import App from "./App.vue";
// import App from "./components/Form.vue";
import router from "./routes";

axios.defaults.baseURL = "https://monster-slayer-bbc5d.firebaseio.com/";
axios.defaults.headers.get["Accepts"] = "applicatino/json";
axios.interceptors.response.use(resp => {
  // console.log("req interceptor", resp);
  resp.json = () => {
    const json = Array.isArray(resp.data)
      ? fromJSONList(resp.data)
      : fromJSON(resp.data);
    return json;
  };
  return resp;
});

// using as a plugin
Vue.use(VueResource);
Vue.use(Vuelidate);

// https://github.com/pagekit/vue-resource/blob/develop/docs/config.md
Vue.http.options.root = "https://monster-slayer-bbc5d.firebaseio.com/";

/*
Vue.http.interceptors.push((request, next) => {
  // console.log("Interceptor Hook");

  next(resp => {
    resp.json = () => {
      const json = Array.isArray(resp.body)
        ? fromJSONList(resp.body)
        : fromJSON(resp.body);

      // console.log("inteceptor json", json);
      return json;
    };
  });
});
*/

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
Vue.component("checkButton", CheckButton);

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
  store,
  router,
  render: h => h(App),
});
