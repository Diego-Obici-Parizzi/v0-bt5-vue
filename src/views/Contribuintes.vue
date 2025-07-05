<template>
  <ToastMsg ref="toastRef" />
  <div class="container pt-4 pb-5">
    <h1 class="mb-4 text-center text-md-start">
      <i class="bi bi-people-fill me-2"></i> Contribuintes
    </h1>

    <div class="card mb-4">
      <div class="card-header">
        {{ contribuinteEmEdicao ? 'Editando Contribuinte' : 'Cadastrar Novo Contribuinte' }}
      </div>
      <div class="card-body">
        <form @submit.prevent="adicionarOuAtualizarContribuinte">
          <div class="row row-cols-1 row-cols-md-2 g-3">
            <div class="col">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" v-model="novoContribuinte.nome">
            </div>
            <div class="col">
              <label for="contato" class="form-label">Contato (E-mail, GitHub, etc)</label>
              <input type="text" class="form-control" id="contato" v-model="novoContribuinte.contato">
            </div>
          </div>
          <div class="mb-3 mt-3">
            <label for="contribuicao" class="form-label">Contribuição</label>
            <textarea class="form-control" id="contribuicao" rows="2" v-model="novoContribuinte.contribuicao"></textarea>
          </div>
          <div class="mb-3">
            <label for="periodo" class="form-label">Período</label>
            <input type="text" class="form-control" id="periodo" v-model="novoContribuinte.periodo" placeholder="Ex: 2024/2">
          </div>
          <div>
            <button type="submit" class="btn btn-primary btn-sm">
              <i :class="contribuinteEmEdicao ? 'bi bi-check-lg' : 'bi bi-plus-lg'"></i>
              {{ contribuinteEmEdicao ? 'Salvar Alterações' : 'Adicionar' }}
            </button>
            <button v-if="contribuinteEmEdicao" @click="cancelarEdicao" type="button" class="btn btn-secondary btn-sm ms-2">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        Lista de Contribuintes
      </div>
      <div class="list-group list-group-flush">
        <div v-for="c in contribuintes" :key="c.id" class="list-group-item">
          <div class="d-flex w-100 flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
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
import { ref, onMounted, nextTick } from 'vue';
import ToastMsg from '@/components/ToastMsg.vue';
const toastRef = ref(null);

const API_URL = 'http://localhost:3000/Contribuintes';

const contribuintes = ref([]);
const novoContribuinte = ref({ nome: '', contato: '', contribuicao: '', periodo: '' });
const contribuinteEmEdicao = ref(null);

const mostrarMensagem = (msg, tipo = 'success') => {
  toastRef.value?.showToast(msg, tipo);
};

onMounted(async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao carregar os contribuintes.');
    contribuintes.value = await response.json();
  } catch(error) {
    mostrarMensagem(error.message, 'error');
  }
});

const adicionarOuAtualizarContribuinte = async () => {
  if (!novoContribuinte.value.nome || !novoContribuinte.value.contribuicao) {
    mostrarMensagem('Os campos Nome e Contribuição são obrigatórios.', 'error');
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
      mostrarMensagem('Contribuinte atualizado com sucesso!', 'success');
    } else {
      contribuintes.value.push(data);
      mostrarMensagem('Contribuinte adicionado com sucesso!', 'success');
    }
    cancelarEdicao();
  } catch (error) {
    mostrarMensagem(error.message, 'error');
  }
};

const editarContribuinte = async (contribuinte) => {
  contribuinteEmEdicao.value = contribuinte;
  novoContribuinte.value = { ...contribuinte };
  await nextTick();
  document.getElementById('nome')?.focus();
};

const cancelarEdicao = () => {
  contribuinteEmEdicao.value = null;
  novoContribuinte.value = { nome: '', contato: '', contribuicao: '', periodo: '' };
};

const removerContribuinte = async (id) => {
  if (!confirm('Tem certeza que deseja remover este contribuinte?')) return;
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('A resposta do servidor não foi OK.');

    contribuintes.value = contribuintes.value.filter(c => c.id !== id);
    mostrarMensagem('Contribuinte removido com sucesso!', 'success');
  } catch (error) {
    mostrarMensagem('Falha ao remover o contribuinte.', 'error');
  }
};
</script>

<style scoped>
.container {
  padding-bottom: 100px;
}
</style>