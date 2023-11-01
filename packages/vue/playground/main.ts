import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./pages/index.vue") },
    ...Object.keys(import.meta.glob("./pages/components/*/index.vue")).map(
      (path) => {
        const name = path.replace(/.*?([^/]+)\/index\.vue$/, "$1");
        return {
          path: `/components/${name}`,
          component: () => import(`./pages/components/${name}/index.vue`),
        };
      }
    ),
  ],
});

createApp(App).use(router).mount("#app");
