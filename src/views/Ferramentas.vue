
<template>
  <ToastMsg ref="toastRef" />
  <div class="container pt-4 pb-5">
    <h1 class="mb-4 text-center text-md-start">
      <i class="bi bi-tools me-2"></i> Ferramentas e Materiais
    </h1>

    <!-- Formulário -->
    <div class="card mb-4">
      <div class="card-header">
        {{ ferramentaEmEdicao ? 'Editando Ferramenta' : 'Cadastrar Nova Ferramenta' }}
      </div>
      <div class="card-body">
        <form @submit.prevent="adicionarOuAtualizarFerramenta">
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div class="col">
              <label for="descricao" class="form-label">Descrição</label>
              <input type="text" class="form-control" id="descricao" v-model="novaFerramenta.descricao" placeholder="Ex: Vue.js">
            </div>
            <div class="col">
              <label for="url" class="form-label">URL</label>
              <input type="url" class="form-control" id="url" v-model="novaFerramenta.url" placeholder="https://exemplo.com">
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="btn btn-primary btn-sm">
              <i :class="ferramentaEmEdicao ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
              {{ ferramentaEmEdicao ? 'Salvar Alterações' : 'Adicionar à Lista' }}
            </button>
            <button v-if="ferramentaEmEdicao" @click="cancelarEdicao" type="button" class="btn btn-secondary btn-sm ms-2">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista -->
    <div class="card">
      <div class="card-header">
        Lista de Ferramentas
      </div>
      <div v-if="ferramentas.length === 0" class="card-body">
        <p class="text-muted">Nenhuma ferramenta cadastrada ainda.</p>
      </div>
      <ul v-else class="list-group list-group-flush">
        <li v-for="ferramenta in ferramentas" :key="ferramenta.id" class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div class="mb-2 mb-md-0">
            <strong>{{ ferramenta.descricao }}</strong><br>
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
import { ref, onMounted, nextTick } from 'vue';
import ToastMsg from '@/components/ToastMsg.vue';

const toastRef = ref(null);
const API_URL = 'http://localhost:3000/Ferramentas';

const ferramentas = ref([]);
const novaFerramenta = ref({ descricao: '', url: '' });
const ferramentaEmEdicao = ref(null);

const mostrarMensagem = (msg, tipo = 'success') => {
  toastRef.value?.showToast(msg, tipo);
};

onMounted(async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao buscar dados das ferramentas.');
    ferramentas.value = await response.json();
  } catch (error) {
    mostrarMensagem(error.message, 'error');
  }
});

const adicionarOuAtualizarFerramenta = async () => {
  if (!novaFerramenta.value.descricao || !novaFerramenta.value.url) {
    mostrarMensagem('Por favor, preencha todos os campos.', 'error');
    return;
  }

  const isEditing = !!ferramentaEmEdicao.value;
  const method = isEditing ? 'PUT' : 'POST';
  const url = isEditing ? `${API_URL}/${ferramentaEmEdicao.value.id}` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaFerramenta.value)
    });

    if (!response.ok) {
      throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'adicionar'} a ferramenta.`);
    }
    const data = await response.json();

    if (isEditing) {
      const index = ferramentas.value.findIndex(f => f.id === data.id);
      ferramentas.value[index] = data;
      mostrarMensagem('Ferramenta atualizada com sucesso!', 'success');
    } else {
      ferramentas.value.push(data);
      mostrarMensagem('Ferramenta adicionada com sucesso!', 'success');
    }
    cancelarEdicao();
  } catch (error) {
    mostrarMensagem(error.message, 'error');
  }
};

const editarFerramenta = async (ferramenta) => {
  ferramentaEmEdicao.value = ferramenta;
  novaFerramenta.value = { ...ferramenta };
  await nextTick();
  document.getElementById('descricao')?.focus();
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
    mostrarMensagem('Ferramenta removida com sucesso!', 'success');
  } catch (error) {
    mostrarMensagem(error.message, 'error');
  }
};
</script>

<style scoped>
.container {
  padding-bottom: 100px;
}
</style>