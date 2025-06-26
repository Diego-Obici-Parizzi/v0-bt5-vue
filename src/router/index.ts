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
    path: `${baseUrl}/gerenciar-rodape`,
    children: [
      { path: "", name: "GerenciarRodape", component: () => import("@/views/Contribuintes.vue") }
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
