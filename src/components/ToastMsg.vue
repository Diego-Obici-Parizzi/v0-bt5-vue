<template>
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999">
      <div 
        v-for="(toast, index) in toasts"
        :key="index"
        class="toast align-items-center text-white"
        :class="toast.type === 'success' ? 'bg-success' : 'bg-danger'"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="toastElements"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="removeToast(index)"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, nextTick } from 'vue';
  import Toast from 'bootstrap/js/dist/toast';
  
  const toasts = ref([]);
  const toastElements = ref([]);
  
  function showToast(message, type = 'success') {
    toasts.value.push({ message, type });
  
    // Espera o DOM atualizar e ativa o Toast Bootstrap
    nextTick(() => {
      const el = toastElements.value[toastElements.value.length - 1];
      if (el) {
        const toast = new Toast(el);
        toast.show();
      }
  
      // Remove da lista após 3 segundos
      setTimeout(() => {
        toasts.value.shift();
      }, 3000);
    });
  }
  
  function removeToast(index) {
    toasts.value.splice(index, 1);
  }
  
  defineExpose({ showToast });
  </script>
  
  <style scoped>
  .toast {
    opacity: 1;
  }
  </style>
  