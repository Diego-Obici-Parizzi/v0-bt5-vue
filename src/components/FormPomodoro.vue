<template>
  <div class="container bg-secondary rounded shadow-sm mt-5 text-white">
    <div class="row">
      <div class="col-12 text-center py-5">
        <p class="fs-1 fw-bold">Pomodoro Timer</p>
        <p class="fs-5">Gerencie suas atividades com eficiência usando o método Pomodoro.</p>
        <p class="fs-5">Considere que cada pomodoro equivale a 25 minutos. Insira o nome e a atividade desempenhada e salve para que seja gerado dados.</p>
        <router-link to="" id="p_25"><img id="p-25" :src="p_25" :alt="alt_3"></router-link>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-secondary text-white">
        <h3 class="mb-0">Pomodoro Timer</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="salvar">
          <div class="row g-3">
            <div class="col-md-4">
              <label for="nome" class="form-label">Nome do Usuário</label>
              <input type="text" class="form-control" id="nome" v-model="form.nome" placeholder="Digite o nome" required>
            </div>
            <div class="col-md-4">
              <label for="atividade" class="form-label">Atividade Desempenhada</label>
              <input type="text" class="form-control" id="atividade" v-model="form.atividade" placeholder="Digite a atividade" required>
            </div>
            <div class="col-md-4">
              <label for="pomodoros" class="form-label">Pomodoros Utilizados</label>
              <input type="number" class="form-control w-50" id="pomodoros" v-model.number="form.pomodoros" placeholder="Ex: 2" min="1" required>
            </div>
          </div>
          <div class="mt-3">
            <button type="submit" class="btn btn-success me-2">
              {{ form.id ? 'Atualizar' : 'Salvar' }}
            </button>
            <button type="button" class="btn btn-primary" @click="limparFormulario">Limpar</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-secondary text-white">
        <h3 class="mb-0">Registros Salvos</h3>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Atividade</th>
                <th>Pomodoros</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dado in dados" :key="dado.id">
                <td>{{ dado.nome }}</td>
                <td>{{ dado.atividade }}</td>
                <td>{{ dado.pomodoros }}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-1" @click="editar(dado)">Editar</button>
                  <button class="btn btn-danger btn-sm me-1" @click="excluir(dado.id)">Excluir</button>
                  <button class="btn btn-success btn-sm" @click="startTimer(dado.atividade, dado.pomodoros)">
                    <i class="bi bi-play-circle"></i> Iniciar
                  </button>
                </td>
              </tr>
              <tr v-if="dados.length === 0">
                <td colspan="5" class="text-center">Nenhum registro encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  name: 'FormPomodoro',
  props: ["p_25", "alt_3", "startTimer"],
  setup(props) {
    const form = ref({
      id: null,
      nome: '',
      atividade: '',
      pomodoros: null
    });

    const dados = ref([]);

    const getDados = async () => {
      try {
        const response = await fetch("http://localhost:3000/Dados");
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        dados.value = data;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados. Verifique o console para mais detalhes.");
      }
    };

    const salvar = async () => {
      try {
        if (!form.value.nome || !form.value.atividade || !form.value.pomodoros) {
          alert("Por favor, preencha todos os campos!");
          return;
        }

        if (form.value.pomodoros < 1) {
          alert("O número de pomodoros deve ser maior que 0!");
          return;
        }

        const url = form.value.id 
          ? `http://localhost:3000/Dados/${form.value.id}` 
          : "http://localhost:3000/Dados";

        const method = form.value.id ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: form.value.nome,
            atividade: form.value.atividade,
            pomodoros: Number(form.value.pomodoros)
          })
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        alert(form.value.id ? "Registro atualizado com sucesso!" : "Registro salvo com sucesso!");
        limparFormulario();
        await getDados();
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar o registro. Verifique o console para mais detalhes.");
      }
    };

    const excluir = async (id) => {
      if (!confirm("Tem certeza que deseja excluir este registro?")) return;

      try {
        const response = await fetch(`http://localhost:3000/Dados/${id}`, {
          method: "DELETE"
        });

        if (response.status === 404) {
          alert("Registro não encontrado. Talvez já tenha sido excluído.");
          await getDados();
          return;
        }

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        alert("Registro excluído com sucesso!");
        await getDados();
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o registro. Verifique o console para mais detalhes.");
      }
    };

    const editar = (dado) => {
      form.value = {
        id: dado.id,
        nome: dado.nome,
        atividade: dado.atividade,
        pomodoros: dado.pomodoros
      };
    };

    const limparFormulario = () => {
      form.value = {
        id: null,
        nome: '',
        atividade: '',
        pomodoros: null
      };
    };

    onMounted(() => {
      getDados();
    });

    return {
      form,
      dados,
      salvar,
      excluir,
      editar,
      limparFormulario,
      startTimer: props.startTimer
    };
  }
};
</script>

<style scoped>
@media (max-width: 1440px) {
  #p-25 {
    width: 30%;
  }
}

@media (max-width: 1080px) {
  #p-25 {
    width: 40%;
  }
}

@media (max-width: 768px) {
  #p-25 {
    width: 60%;
  }
}

@media (max-width: 521px) {
  .btn-sm {
    width: 100%;
  }

  #p-25 {
    width: 60%;
  }
}
</style>