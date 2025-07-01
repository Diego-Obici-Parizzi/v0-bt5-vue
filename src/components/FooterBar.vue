<template>
    <div id="footer" class="container-fluid bg-dark">
        <div class="row p-2">
            <div class="col-md-4 text-center mt-2">
                <p class="text-white">Ferramentas e Materiais</p>
            </div>
            <div class="col-md-4 text-center mt-2">
                <p class="text-white">Contribuintes</p>
            </div>
            <div class="col-md-4">
                <router-link to=""><img class="w-100 mt-2 mb-2" id="utfpr" :src="utfpr" :alt="alt_2"></router-link>
            </div>
        </div>
    </div>
    </template>
    <script lang="ts">
    export default {
        name: 'FooterBar',
        props: ["utfpr", "alt_2"] 
    }
    </script>
    <style>
    #footer {
        margin-top: 120%;
    }
    </style>