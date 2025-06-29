<template>
  <div class="container mt-5 mb-5 pb-5">
    <h1 class="mb-4"><i class="bi bi-tools"></i> Ferramentas e Materiais</h1>

    <!-- Mensagens de Alerta -->
    <div v-if="mensagemSucesso" class="alert alert-success" role="alert">
      {{ mensagemSucesso }}
    </div>
    <div v-if="mensagemErro" class="alert alert-danger" role="alert">
      {{ mensagemErro }}
    </div>

    <!-- Formulário de Cadastro e Edição -->
    <div class="card mb-4">
      <div class="card-header">
        {{ ferramentaEmEdicao ? 'Editando Ferramenta' : 'Cadastrar Nova Ferramenta' }}
      </div>
      <div class="card-body">
        <form @submit.prevent="adicionarOuAtualizarFerramenta">
          <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <input type="text" class="form-control" id="descricao" v-model="novaFerramenta.descricao" placeholder="Ex: Vue.js">
          </div>
          <div class="mb-3">
            <label for="url" class="form-label">URL</label>
            <input type="url" class="form-control" id="url" v-model="novaFerramenta.url" placeholder="https://exemplo.com">
          </div>
          <button type="submit" class="btn btn-primary">
            <i :class="ferramentaEmEdicao ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
            {{ ferramentaEmEdicao ? 'Salvar Alterações' : 'Adicionar à Lista' }}
          </button>
          <button v-if="ferramentaEmEdicao" @click="cancelarEdicao" type="button" class="btn btn-secondary ms-2">
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Lista de Ferramentas Cadastradas -->
    <div class="card">
      <div class="card-header">
        Lista de Ferramentas
      </div>
      <div v-if="ferramentas.length === 0" class="card-body">
        <p class="text-muted">Nenhuma ferramenta cadastrada ainda.</p>
      </div>
      <ul v-else class="list-group list-group-flush">
        <li v-for="ferramenta in ferramentas" :key="ferramenta.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ ferramenta.descricao }}</strong>
            <br>
            <a :href="ferramenta.url" target="_blank" class="text-muted small">{{ ferramenta.url }}</a>
          </div>
          <div>
            <button @click="editarFerramenta(ferramenta)" class="btn btn-sm btn-outline-secondary me-2">
              <i class="bi bi-pencil-fill"></i> Editar
            </button>
            <button @click="removerFerramenta(ferramenta.id)" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i> Remover
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3000/ferramentas';

const ferramentas = ref([]);
const novaFerramenta = ref({ descricao: '', url: '' });
const ferramentaEmEdicao = ref(null);

const mensagemSucesso = ref('');
const mensagemErro = ref('');

// Função para mostrar mensagem e limpar após 3 segundos
const mostrarMensagem = (msg, tipo = 'sucesso') => {
  if (tipo === 'sucesso') {
    mensagemSucesso.value = msg;
    mensagemErro.value = '';
  } else {
    mensagemErro.value = msg;
    mensagemSucesso.value = '';
  }
  setTimeout(() => {
    mensagemSucesso.value = '';
    mensagemErro.value = '';
  }, 3000);
};

// Carregar ferramentas da API quando o componente é montado
onMounted(async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao buscar dados.');
    ferramentas.value = await response.json();
  } catch (error) {
    mostrarMensagem(error.message, 'erro');
  }
});

const adicionarOuAtualizarFerramenta = async () => {
  if (!novaFerramenta.value.descricao || !novaFerramenta.value.url) {
    mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
    return;
  }

  if (ferramentaEmEdicao.value) {
    // ATUALIZAR (PUT)
    try {
      const response = await fetch(`${API_URL}/${ferramentaEmEdicao.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaFerramenta.value)
      });
      if (!response.ok) throw new Error('Falha ao atualizar a ferramenta.');
      const data = await response.json();
      const index = ferramentas.value.findIndex(f => f.id === data.id);
      ferramentas.value[index] = data;
      mostrarMensagem('Ferramenta atualizada com sucesso!');
      cancelarEdicao();
    } catch (error) {
      mostrarMensagem(error.message, 'erro');
    }
  } else {
    // ADICIONAR (POST)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaFerramenta.value)
      });
      if (!response.ok) throw new Error('Falha ao adicionar a ferramenta.');
      const data = await response.json();
      ferramentas.value.push(data);
      mostrarMensagem('Ferramenta adicionada com sucesso!');
      novaFerramenta.value = { descricao: '', url: '' }; // Limpa o formulário
    } catch (error) {
      mostrarMensagem(error.message, 'erro');
    }
  }
};

const editarFerramenta = (ferramenta) => {
  ferramentaEmEdicao.value = ferramenta;
  novaFerramenta.value = { ...ferramenta }; // Copia os dados para o formulário
  window.scrollTo(0, 0); // Rola a página para o topo para ver o formulário de edição
};

const cancelarEdicao = () => {
  ferramentaEmEdicao.value = null;
  novaFerramenta.value = { descricao: '', url: '' };
};

const removerFerramenta = async (id) => {
  if (!confirm('Tem certeza que deseja remover esta ferramenta?')) return;
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Falha ao remover a ferramenta.');
    ferramentas.value = ferramentas.value.filter(f => f.id !== id);
    mostrarMensagem('Ferramenta removida com sucesso!');
  } catch (error) {
    mostrarMensagem(error.message, 'erro');
  }
};
</script>

<style scoped>
/* Adiciona espaço na parte inferior para o footer fixo não sobrepor o conteúdo */
.container {
  padding-bottom: 100px; 
}
</style>