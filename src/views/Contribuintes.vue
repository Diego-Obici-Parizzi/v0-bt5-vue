<template>
    <div class="container mt-4">
      <h2>Gerenciar Rodapé</h2>
  
      <form @submit.prevent="salvarDados" class="mb-4">
        <div class="mb-3">
          <label for="escopo" class="form-label">Escopo do Projeto</label>
          <input type="text" v-model="escopo" class="form-control" id="escopo" required>
        </div>
        <div class="mb-3">
          <label for="contribuinte" class="form-label">Contribuinte</label>
          <input type="text" v-model="contribuinte" class="form-control" id="contribuinte" required>
        </div>
        <button class="btn btn-success">Salvar</button>
      </form>
  
      <hr />
  
      <h3>Ferramentas / Materiais de Apoio</h3>
  
      <form @submit.prevent="adicionarFerramenta" class="row g-2 mb-3">
        <div class="col-md-5">
          <input type="text" v-model="novaFerramenta.nome" class="form-control" placeholder="Nome" required>
        </div>
        <div class="col-md-5">
          <input type="url" v-model="novaFerramenta.url" class="form-control" placeholder="URL" required>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">Adicionar</button>
        </div>
      </form>
  
      <ul class="list-group">
        <li v-for="(item, index) in ferramentas" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ item.nome }} - <a :href="item.url" target="_blank">{{ item.url }}</a></span>
          <button class="btn btn-danger btn-sm" @click="removerFerramenta(index)">Remover</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "Contribuintes",
    data() {
      return {
        escopo: "Aplicação Pomodoro",
        contribuinte: "Diego Parizzi",
        novaFerramenta: {
          nome: "",
          url: "",
        },
        ferramentas: [] as { nome: string; url: string }[],
      };
    },
    mounted() {
      const dados = localStorage.getItem("footerData");
      if (dados) {
        const parsed = JSON.parse(dados);
        this.escopo = parsed.escopo || this.escopo;
        this.contribuinte = parsed.contribuinte || this.contribuinte;
        this.ferramentas = parsed.ferramentas || [];
      }
    },
    methods: {
      salvarDados() {
        const dados = {
          escopo: this.escopo,
          contribuinte: this.contribuinte,
          ferramentas: this.ferramentas,
        };
        localStorage.setItem("footerData", JSON.stringify(dados));
        alert("Dados salvos!");
      },
      adicionarFerramenta() {
        this.ferramentas.push({ ...this.novaFerramenta });
        this.novaFerramenta.nome = "";
        this.novaFerramenta.url = "";
      },
      removerFerramenta(index: number) {
        this.ferramentas.splice(index, 1);
      },
    },
  };
  </script>
  