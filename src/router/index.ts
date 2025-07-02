import { createRouter, createWebHistory } from "vue-router";

//const baseUrl = import.meta.env.VITE_BUILD_ADDRESS;
const baseUrl = "";
export const routes = [
  {
    path: `${baseUrl}/`,
    //component: () => import("@/layouts/Default.vue"),
    children: [
      { path: "", name: "Inicio", component: () => import("@/views/Inicio.vue") }
    ],
  },
  {
    path: `${baseUrl}/Pomodoro`,
    //component: () => import("@/layouts/Page.vue"),
    children: [
      { path: "", name: "Pomodoro", component: () => import("@/views/Pomodoro.vue") }
    ],
  },

  {
    path: `${baseUrl}/Estatisticas`,
    //component: () => import("@/layouts/Page.vue"),
    children: [
      { path: "", name: "Estatisticas", component: () => import("@/views/Estatisticas.vue") },
    ],
  },
  
  {
    path: `${baseUrl}/Contribuintes`,
    //component: () => import("@/layouts/Page.vue"),
    children: [
      { path: "", name: "Contribuintes", component: () => import("@/views/Contribuintes.vue") },
    ],
  },

  {
    path: `${baseUrl}/Ferramentas`,
    //component: () => import("@/layouts/Page.vue"),
    children: [
      { path: "", name: "ConFerramentastribuintes", component: () => import("@/views/Ferramentas.vue") },
    ],
  },

];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});
