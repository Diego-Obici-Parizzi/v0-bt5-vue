<template>
  <ToastMsg ref="toastRef" />
  <PomodoroTimer ref="timerRef" />

  <div>
    <FormPomodoro
      :p_25="p_25_img"
      :alt_3="p_25_name"
      :startTimer="iniciarPomodoro"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToastMsg from '@/components/ToastMsg.vue';
import FormPomodoro from '@/components/FormPomodoro.vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';

const toastRef = ref(null);
const timerRef = ref(null);

const p_25_img = './img/pomodoro-25min.png';
const p_25_name = 'Pomodoro_25min';

const mostrarMensagem = (msg: string, tipo: 'success' | 'error' = 'success') => {
  (toastRef.value as any)?.showToast(msg, tipo);
};

const iniciarPomodoro = (atividade: string, quantidade: number) => {
  (timerRef.value as any)?.iniciarPomodoro(atividade, quantidade);
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mt-4 {
  margin-top: 1.5rem;
}
</style>
