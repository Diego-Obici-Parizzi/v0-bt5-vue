<template>
  <div class="container mt-5 mb-5 pb-5">
    <h1 class="mb-4"><i class="bi bi-people-fill"></i> Contribuintes</h1>

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
        {{ contribuinteEmEdicao ? 'Editando Contribuinte' : 'Cadastrar Novo Contribuinte' }}
      </div>
      <div class="card-body">
        <form @submit.prevent="adicionarOuAtualizarContribuinte">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" v-model="novoContribuinte.nome">
            </div>
            <div class="col-md-6 mb-3">
              <label for="contato" class="form-label">Contato (E-mail, GitHub, etc)</label>
              <input type="text" class="form-control" id="contato" v-model="novoContribuinte.contato">
            </div>
          </div>
          <div class="mb-3">
            <label for="contribuicao" class="form-label">Contribuição</label>
            <textarea class="form-control" id="contribuicao" rows="2" v-model="novoContribuinte.contribuicao"></textarea>
          </div>
          <div class="mb-3">
            <label for="periodo" class="form-label">Período</label>
            <input type="text" class="form-control" id="periodo" v-model="novoContribuinte.periodo" placeholder="Ex: 2024/2">
          </div>
          <button type="submit" class="btn btn-primary">
            <i :class="contribuinteEmEdicao ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
            {{ contribuinteEmEdicao ? 'Salvar Alterações' : 'Adicionar' }}
          </button>
           <button v-if="contribuinteEmEdicao" @click="cancelarEdicao" type="button" class="btn btn-secondary ms-2">
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Lista de Contribuintes -->
    <div class="card">
      <div class="card-header">
        Lista de Contribuintes
      </div>
      <div class="list-group list-group-flush">
        <div v-for="c in contribuintes" :key="c.id" class="list-group-item">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ c.nome }}</h5>
            <small class="text-muted">{{ c.periodo }}</small>
          </div>
          <p class="mb-1">{{ c.contribuicao }}</p>
          <small class="text-muted">{{ c.contato }}</small>
          <div class="mt-2">
            <button @click="editarContribuinte(c)" class="btn btn-sm btn-outline-secondary me-2">
              <i class="bi bi-pencil-fill"></i> Editar
            </button>
            <button @click="removerContribuinte(c.id)" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i> Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:3000/contribuintes';

const contribuintes = ref([]);
const novoContribuinte = ref({ nome: '', contato: '', contribuicao: '', periodo: '' });
const contribuinteEmEdicao = ref(null);

const mensagemSucesso = ref('');
const mensagemErro = ref('');


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

onMounted(async () => {
  const response = await fetch(API_URL);
  contribuintes.value = await response.json();
});

const adicionarOuAtualizarContribuinte = async () => {
  if (!novoContribuinte.value.nome || !novoContribuinte.value.contribuicao) {
    mostrarMensagem('Os campos Nome e Contribuição são obrigatórios.', 'erro');
    return;
  }

  const method = contribuinteEmEdicao.value ? 'PUT' : 'POST';
  const url = contribuinteEmEdicao.value ? `${API_URL}/${contribuinteEmEdicao.value.id}` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoContribuinte.value)
    });
    if (!response.ok) throw new Error('Falha na operação com contribuinte.');
    const data = await response.json();

    if (contribuinteEmEdicao.value) {
      const index = contribuintes.value.findIndex(c => c.id === data.id);
      contribuintes.value[index] = data;
      mostrarMensagem('Contribuinte atualizado com sucesso!');
    } else {
      contribuintes.value.push(data);
      mostrarMensagem('Contribuinte adicionado com sucesso!');
    }
    cancelarEdicao();
  } catch (error) {
    mostrarMensagem(error.message, 'erro');
  }
};

const editarContribuinte = (contribuinte) => {
  contribuinteEmEdicao.value = contribuinte;
  novoContribuinte.value = { ...contribuinte };
  window.scrollTo(0, 0);
};

const cancelarEdicao = () => {
  contribuinteEmEdicao.value = null;
  novoContribuinte.value = { nome: '', contato: '', contribuicao: '', periodo: '' };
};

const removerContribuinte = async (id) => {
  if (!confirm('Tem certeza que deseja remover este contribuinte?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    contribuintes.value = contribuintes.value.filter(c => c.id !== id);
    mostrarMensagem('Contribuinte removido com sucesso!');
  } catch (error) {
    mostrarMensagem('Falha ao remover o contribuinte.', 'erro');
  }
};
</script>

<style scoped>
.container {
  padding-bottom: 100px;
}
</style>