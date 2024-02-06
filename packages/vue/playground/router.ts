import { createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob("./pages/**/page.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: Object.entries(pages).map(([path, component]) => ({
    path: path.replace(/^\.\/pages(\/.+?)\/page.vue/, "$1"),
    component,
  })),
});
