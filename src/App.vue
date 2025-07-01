<template>
    <NavBar :logo="logo_src" :alt="app_name"/>
    <router-view/>
    <FooterBar :utfpr="Utfpr_logo" :alt_2="utfpr_name"/>
  </template>

  <script lang="ts">
import Footer from './components/FooterBar.vue';
import Navbar from './components/NavBar.vue';
  export default {
    components: {
      FooterBar: Footer,
      NavBar: Navbar
    },
    data() {
      return {
        logo_src: ('./img/pomodoro-logo.png'),
        app_name: 'Pomodoro App',
        Utfpr_logo: ('./img/utfpr.gif'),
        utfpr_name: 'UTFPR Logo'
      };
    }
  }
  </script>
  
  <style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  </style>