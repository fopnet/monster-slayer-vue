// import App from "./App.vue";
import Home from "./components/Home.vue";
// import Form from "./components/Form.vue";

const FormLazy = resolve => {
  require.ensure(["./components/Form.vue"], () => {
    resolve(require("./components/Form.vue"));
  });
};

export const routes = [
  { path: "/app", component: Home },
  { path: "/form", component: FormLazy },
  { path: "*", redirect: "/app" },
];
