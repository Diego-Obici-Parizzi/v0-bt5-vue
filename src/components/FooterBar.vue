<template>
    <footer id="footer" class="container-fluid bg-dark">
      <div class="row">
        <div class="col-md-5 text-center mt-2">
          <router-link to="/Ferramentas" class="footer-link">
            <i class="bi bi-tools"></i> Ferramentas e Materiais
          </router-link>
        </div>
        <div class="col-md-5 text-center mt-2">
          <router-link to="/Contribuintes" class="footer-link">
            <i class="bi bi-people-fill"></i> Contribuintes
          </router-link>
        </div>
        <div class="col-md-2">
          <router-link to="/">
            <img class="w-100 mt-2 mb-2" id="utfpr" :src="utfpr" :alt="alt_2">
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center pb-3">
          <p class="text-white mb-0">
            © {{ new Date().getFullYear() }} v0-bt5-vue Pomodoro
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FooterBar',
    props: {
      utfpr: {
        type: String,
        required: true
      },
      alt_2: {
        type: String,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  #footer {
    margin-top: 120%; 
    position: sticky; 
    bottom: 0;
    width: 100%;
  }
  
  #utfpr {
    filter: drop-shadow(0 0 2px white);
  }
  
  .footer-link {
    color: #F8BB32 !important;
    font-size: 2.1em;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: text-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  
  .footer-link h2 {
      margin-bottom: 0; 
      line-height: 1;
  }

  .footer-link:hover {
    color: #FFE082 !important;
    text-shadow: 0 0 8px #F8BB32, 0 0 15px #F8BB32;
  }
  </style>