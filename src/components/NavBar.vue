<template>
    <div class="container-fluid bg-dark">
          <div class="row">
            <div class="col-8">
              <nav class="navbar navbar-expand-md navbar-dark">   
      <div>
        <button class="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link text-decoration-none text-white"><h3>Início</h3></router-link> 
            </li>
            <li class="nav-item">
              <router-link to="/pomodoro" class="nav-link text-decoration-none text-white"><h3>Pomodoro</h3></router-link> 
            </li>
            <li class="nav-item">
              <router-link to="/estatisticas" class="nav-link text-decoration-none text-white"><h3>Estatísticas</h3></router-link> 
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white fs-4" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Idiomas
              </a>
              <ul class="dropdown-menu bg-white" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">Português</a></li>
                <li><a class="dropdown-item" href="#">Inglês</a></li>
                <li><a class="dropdown-item" href="#">Espanhol</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
        </div>
            <div class="col-4 text-end align-content-center">
              <router-link to="" id="router"><img id="logo" :src="logo" :alt="alt"></router-link>
            </div>
          </div>
    </div>
    
        
    </template>
    
    <script lang="ts">
    export default {
        name: 'NavBar',
        props: ["logo", "alt"]
    }
    </script>
    <style scoped>
    h3, #navbarDropdownMenuLink{
        margin-top: 40px;
    }
    #logo{
        height: 10vh;
    }
    </style>