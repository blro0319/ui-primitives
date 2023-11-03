import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/index.vue"),
    },
    {
      path: "/components",
      component: () => import("./pages/components/index.vue"),
    },
    ...p(import.meta.glob("./pages/components/*/index.vue")).map((name) => ({
      path: `/components/${name}`,
      component: () => import(`./pages/components/${name}/index.vue`),
    })),
    {
      path: "/composables",
      component: () => import("./pages/composables/index.vue"),
    },
    ...p(import.meta.glob("./pages/composables/*/index.vue")).map((name) => ({
      path: `/composables/${name}`,
      component: () => import(`./pages/composables/${name}/index.vue`),
    })),
  ],
});

createApp(App).use(router).mount("#app");

function p(globs: Record<string, unknown>) {
  const paths = Object.keys(globs);
  return paths.map((path) => path.replace(/.*?([^/]+)\/index\.vue$/, "$1"));
}
