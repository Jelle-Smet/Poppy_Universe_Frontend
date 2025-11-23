<script setup>
import TestComponent from '../components/TestComponent.vue';
</script>

<template>
  <div class="home">
    <h1>Welcome to Poppy Universe 🌌</h1>
    <p>This is your test homepage for the frontend.</p>
    <TestComponent />
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #4f46e5; /* nice purple-blue vibe */
}

p {
  color: #10b981; /* green text for TestComponent */
}
</style>
