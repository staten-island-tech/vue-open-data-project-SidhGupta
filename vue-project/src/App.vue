<!-- src/App.vue -->
<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Death Based Off Of Sex</RouterLink>
        <RouterLink to="/">Death Based Off Of Race</RouterLink>
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
