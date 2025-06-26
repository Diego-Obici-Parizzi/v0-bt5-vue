<template>
    <div id="footer" class="container-fluid bg-dark text-white">
      <div class="row">
        <div class="col-md-4 text-center mt-2">
          <p>Ferramentas e Materiais de Apoio</p>
          <ul class="list-unstyled">
            <li v-for="(ferramenta, index) in ferramentas" :key="index">
              <a :href="ferramenta.url" target="_blank" class="text-white text-decoration-underline">{{ ferramenta.nome }}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 text-center mt-2">
          <p>{{ contribuinte }}</p>
        </div>
        <div class="col-md-3 text-center mt-2">
          <p>{{ escopo }}</p>
        </div>
        <div class="col-md-2">
          <router-link to="/">
            <img class="w-100 mt-2 mb-2" id="utfpr" :src="utfpr" :alt="alt_2">
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'FooterBar',
    props: ["utfpr", "alt_2"],
    data() {
      return {
        escopo: "Aplicação Pomodoro",
        contribuinte: "Diego Parizzi",
        ferramentas: [] as { nome: string; url: string }[],
      };
    },
    mounted() {
      const dados = localStorage.getItem("footerData");
      if (dados) {
        const parsed = JSON.parse(dados);
        this.escopo = parsed.escopo;
        this.contribuinte = parsed.contribuinte;
        this.ferramentas = parsed.ferramentas || [];
      }
    }
  }
  </script>
  
  <style scoped>
  #footer {
    margin-top: 120%;
  }
  </style>
  