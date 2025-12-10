// Home_Page.vue
<script setup>
import { ref, onMounted } from 'vue';
import TestComponent from '../components/TestComponent.vue';

// Reactive state for a subtle "pop-in" effect on the title
const isLoaded = ref(false);

onMounted(() => {
  // Wait a moment before setting to true for the animation
  setTimeout(() => {
    isLoaded.value = true;
  }, 50);
});
</script>

<template>
  <div class="poppy-universe-home"> 
    <header class="hero">
      <h1 :class="['hero-title', { 'loaded': isLoaded }]">
        Welcome to the **Poppy Universe** 🌌
      </h1>
      <p class="hero-subtitle">
        Your gateway to endless possibilities and vibrant frontend exploration.
      </p>
      <button class="cta-button" @click="console.log('Explore Clicked!')">
        Start Exploring &rarr;
      </button>
    </header>

    <main class="content-section">
      <section class="component-showcase">
        <h2>✨ Current Feature Showcase</h2>
        <div class="component-wrapper">
          <TestComponent />
          <p class="test-component-note">
            (The TestComponent is currently rendering in this orbit.)
          </p>
        </div>
      </section>

      <section class="quick-links">
        <h2>🚀 Quick Jumps</h2>
        <ul>
          <li><a href="/about">About the Project</a></li>
          <li><a href="/dashboard">View Dashboard</a></li>
          <li><a href="/settings">Configure Universe</a></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
/*
|--------------------------------------------------------------------------
| Global Container Styling
|--------------------------------------------------------------------------
| NOTE: Background removed as it's now controlled by the layout!
*/
.poppy-universe-home {
  /* Removed: min-height and background here. */
  padding: 20px; 
  color: #e5e7eb;
  font-family: 'Inter', sans-serif;
  padding-bottom: 80px;
}

/*
|--------------------------------------------------------------------------
| Hero Section (The Big Intro)
|--------------------------------------------------------------------------
*/
.hero {
  text-align: center;
  padding: 80px 20px;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 10px;
  font-weight: 900;
  color: #fca5a5;
  letter-spacing: -1px;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.hero-title.loaded {
  opacity: 1;
  transform: translateY(0);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #bfdbfe;
  margin-bottom: 30px;
  font-style: italic;
}

.cta-button {
  background-color: #fca5a5;
  color: #1f013d;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  box-shadow: 0 4px 15px rgba(252, 165, 165, 0.4);
}

.cta-button:hover {
  background-color: #f97171;
  transform: translateY(-2px);
}

/*
|--------------------------------------------------------------------------
| Content Sections
|--------------------------------------------------------------------------
*/
.content-section {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

section {
  /* Using a slightly opaque background to make text readable over the starry background */
  background-color: rgba(31, 1, 61, 0.7); 
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
}

h2 {
  color: #10b981;
  font-size: 1.8rem;
  border-bottom: 2px solid #10b981;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* Test Component Section */
.component-wrapper {
  padding: 20px;
  border: 1px dashed #bfdbfe;
  border-radius: 10px;
}

.test-component-note {
  color: #bfdbfe;
  margin-top: 15px;
  font-size: 0.9rem;
}

/* Quick Links */
.quick-links ul {
  list-style: none;
  padding: 0;
}

.quick-links li {
  margin-bottom: 10px;
}

.quick-links a {
  color: #fca5a5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  display: block;
  padding: 5px 0;
}

.quick-links a:hover {
  color: #f97171;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .content-section {
    flex-direction: column;
    align-items: center;
  }
}
</style>