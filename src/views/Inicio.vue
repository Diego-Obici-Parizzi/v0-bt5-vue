<template>
    <div class="container-fluid mt-5">
      <div class="row bg-secondary">
        <div class="col-md-12 text-white">
          <h1>Pomodoro Timer</h1>
          <p>Um aplicativo para registrar sessões Pomodoro e acompanhar produtividade.</p>

          <h2>Visão Geral</h2>
          <p>O Pomodoro Timer é uma aplicação Vue.js que permite aos usuários registrar sessões de trabalho no método Pomodoro (25 minutos por sessão). O usuário informa a atividade realizada, seu nome e quantos pomodoros foram necessários para concluir a tarefa.</p>
          
          <div>
            <h3>Principais Funcionalidades</h3>
            <ul>
                <ol>Registro de atividades com contagem de pomodoros</ol>
                <ol>Suporte a múltiplos idiomas (Português, Inglês, Espanhol)</ol>
                <ol>Temas claro e escuro</ol>
                <ol>Painel de estatísticas com gráficos e filtros</ol>
                <ol>Armazenamento local dos dados</ol>
            </ul>
          </div>
            <h2>Funcionalidades Detalhadas</h2>

            <h3>1. Registro de Pomodoros</h3>
            <p>O usuário pode registrar uma atividade concluída informando:</p>
            <ul>
                <ol>Nome do usuário</ol>
                <ol>Descrição da atividade</ol>
                <ol>Quantidade de pomodoros utilizados (cada pomodoro = 25 minutos)</ol>
                <ol>Data da realização (preenchida automaticamente)</ol>
            </ul>
            
            <h3>2. Internacionalização (i18n)</h3>
            <p>O aplicativo oferece suporte a três idiomas:</p>
            <ul>
                <ol>Português (padrão)</ol>
                <ol>Inglês</ol>
                <ol>Espanhol</ol>
            </ul>
            <p>O usuário pode alternar entre os idiomas através de um seletor na interface.</p>

            <h3>3. Alternância de Tema</h3>
            <p>Dois esquemas de cores estão disponíveis:</p>
            <ul>
                <ol><strong>Tema Claro:</strong> Fundo branco com texto escuro (padrão)</ol>
                <ol><strong>Tema Escuro:</strong> Fundo escuro com texto claro</ol>
            </ul>
            <p>A preferência do usuário é armazenada localmente.</p>

            <h3>4. Aba Estatisticas</h3>
            <p>A aba de estatísticas exibe visualizações gráficas dos dados coletados, incluindo: </p>
            <ul>
                <ol>Comparativo de produtividade entre usuários</ol>
                <ol>Evolução da produtividade ao longo do tempo</ol>
            </ul>
            <p>Filtros disponíveis:</p>
            <ul>
                <ol>Tipo de atividade</ol>
                <ol>Usuário</ol>
            </ul>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'Inicio',
  props: {
    logo: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
}
</script>
