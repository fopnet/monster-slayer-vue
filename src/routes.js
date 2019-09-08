// import App from "./App.vue";
import Home from "./components/Home.vue";
import Signup from "./components/auth/Signup.vue";
import Signin from "./components/auth/Signin.vue";
import VueRouter from "vue-router";
import Vue from "vue";
// import Form from "./components/Form.vue";
import store from "./store";

const FormLazy = resolve => {
  require.ensure(["./components/Form.vue"], () => {
    resolve(require("./components/Form.vue"));
  });
};

Vue.use(VueRouter);

export const routes = [
  { path: "/login", component: Signin },
  { path: "/signup", component: Signup },
  {
    path: "/app",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
  },
  { path: "/form", component: FormLazy },
  // { path: "*", redirect: "/app" },
];

export default new VueRouter({
  routes,
  mode: "history", // no hash tag style {hash ou history}
});
