<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <span class="wip">WORK IN PROGRESS</span>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import '@/assets/base.css';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar{
  background-color: black;
  width: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #e91e63;
  border-radius: 50px;
}

.wip {
  position: fixed;
  right: 2%;
  top: 96%;
  transform: translateY(-50%);
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  font-size: 3rem;
  font-style: italic;
  z-index: 999;
}
</style>
