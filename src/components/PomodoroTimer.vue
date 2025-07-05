<template>
    <div class="modal fade" id="pomodoroModal" ref="pomodoroModalRef" tabindex="-1" aria-labelledby="pomodoroModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h5 class="modal-title" id="pomodoroModalLabel">Pomodoro em Andamento</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <h5 class="mb-3">{{ atividade }}</h5>
            <div class="display-3 fw-bold">{{ minutos }}:{{ segundos }}</div>
            <p class="mt-3">Pomodoro {{ pomodoroAtual }} de {{ totalPomodoros }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              <i class="bi bi-stop-circle"></i> Parar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import Modal from 'bootstrap/js/dist/modal';
  
  const atividade = ref('');
  const totalPomodoros = ref(0);
  const pomodoroAtual = ref(1);
  const tempoRestante = ref(25 * 60);
  const timer = ref(null);
  
  const pomodoroModalRef = ref(null);
  let modalInstance = null;
  
  const audio = new Audio('/beep.mp3');
  
  const minutos = computed(() => String(Math.floor(tempoRestante.value / 60)).padStart(2, '0'));
  const segundos = computed(() => String(tempoRestante.value % 60).padStart(2, '0'));
  
 
  function iniciarPomodoro(nomeAtividade, quantidadePomodoros) {
    if (timer.value) {
      alert('Já há um pomodoro em andamento.');
      return;
    }
  
    atividade.value = nomeAtividade;
    totalPomodoros.value = quantidadePomodoros;
    pomodoroAtual.value = 1;
    tempoRestante.value = 25 * 60;
  
    modalInstance?.show();
    iniciarContagem();
  }
  
  function iniciarContagem() {
    timer.value = setInterval(() => {
      tempoRestante.value--;
  
      if (tempoRestante.value <= 0) {
        audio.play();
  
        if (pomodoroAtual.value < totalPomodoros.value) {
          pomodoroAtual.value++;
          tempoRestante.value = 25 * 60;
        } else {
          alert('Todos os pomodoros foram concluídos!');
          modalInstance?.hide();
        }
      }
    }, 1000);
  }
  
  function resetarEstado() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
    atividade.value = '';
    totalPomodoros.value = 0;
    pomodoroAtual.value = 1;
    tempoRestante.value = 25 * 60;
  }
  

  onMounted(() => {
    if (pomodoroModalRef.value) {

      modalInstance = new Modal(pomodoroModalRef.value);

      pomodoroModalRef.value.addEventListener('hidden.bs.modal', () => {
        resetarEstado();
      });
    }
  });
  

  onUnmounted(() => {
    resetarEstado();

    modalInstance?.dispose();
  });
  
  defineExpose({ iniciarPomodoro });
  </script>
  
  <style scoped>
  .display-3 {
    font-size: 4rem;
  }
  </style>