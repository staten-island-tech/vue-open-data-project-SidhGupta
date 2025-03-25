<!-- src/App.vue -->
<script setup>
<<<<<<< HEAD
import { RouterLink, RouterView } from 'vue-router'
=======
import { RouterLink, RouterView } from 'vue-router';

console.log('App.vue is loaded');  // This logs when the app is loaded
>>>>>>> parent of 433a7b0 (changes)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
<<<<<<< HEAD
        <RouterLink to="/sex-death">Death Based Off Of Sex</RouterLink>
        <RouterLink to="/race-death">Death Based Off Of Race</RouterLink>
=======
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
>>>>>>> parent of 433a7b0 (changes)
      </nav>
    </div>
    <RouterView></RouterView>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
