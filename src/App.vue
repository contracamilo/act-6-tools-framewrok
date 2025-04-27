<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-brand">Task Manager</div>
    </nav>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background: #f5f5f5;
  color: #333;
}

/* App layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  background: #2c3e50;
  color: white;
  padding: 1rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.main {
  flex: 1;
  padding: 20px;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Form styles */
input,
textarea,
select {
  font-family: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
