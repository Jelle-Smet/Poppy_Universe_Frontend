<script setup>
import { ref, onMounted } from 'vue';
import TestComponent from '../components/TestComponent.vue';

const isLoaded = ref(false);
const dataFlowMd = ref('Loading data flow...');

onMounted(async () => {
  // Trigger initial animation
  setTimeout(() => {
    isLoaded.value = true;
  }, 50);

  // Fetch the Markdown data flow file
  try {
    const response = await fetch('../../Public/Data_Flow/Poppy_Universe_Data_Flow.md');
    if (response.ok) {
      dataFlowMd.value = await response.text();
    } else {
      dataFlowMd.value = 'Failed to load data flow documentation.';
    }
  } catch (e) {
    console.error(e);
    dataFlowMd.value = 'Error fetching data flow documentation.';
  }
});
</script>

<template>
  <div class="poppy-universe-home"> 
    <header class="hero">
      <h1 :class="['hero-title', { 'loaded': isLoaded }]">
        Welcome to the <span class="universe-highlight">Poppy Universe</span> 🌌
      </h1>
      <p class="hero-subtitle">
        Explore planets, moons, and Gaia stars while logging your cosmic discoveries.
      </p>
      <button class="cta-button" @click="console.log('Start Exploring Clicked!')">
        Begin Expedition &rarr;
      </button>
    </header>

    <main class="content-section">
      
      <section class="project-mission cosmic-panel large-panel">
        <h2>✨ Project Core</h2>
        <p class="mission-text">
          Poppy Universe is a **cosmic exploration platform** for recording and analyzing celestial data. Log planets, moons, and stars, and get **AI-powered recommendations** for your next discoveries.
        </p>
        <div class="mission-details">
          <strong>Core Features:</strong>
          <ul class="feature-list">
            <li><span class="bullet-glow">🌍</span> Planet & Moon Database (Solar System only)</li>
            <li><span class="bullet-glow">🌟</span> Gaia Star Observations</li>
            <li><span class="bullet-glow">🤖</span> Explorer Recommendations Engine</li>
            <li><span class="bullet-glow">🔐</span> Secure Authentication & Data Logging</li>
          </ul>
        </div>
      </section>

      <section class="architecture-hint cosmic-panel large-panel">
        <h2>🏗️ Data Flow Overview</h2>
        <p class="mission-text">
          All explorer observations and logs are processed through a structured data flow. Below is the full pipeline from frontend to backend (Refer to the linked MD file for backend/frontend/data flow of explorer data):
        </p>
        <div class="diagram-placeholder">
          <pre class="dataflow-md">
{{ dataFlowMd }}
          </pre>
        </div>
      </section>

      <div class="content-row">
        <section class="tech-overview cosmic-panel">
          <h2>💻 Technologies Used</h2>
          <div class="tech-grid">
            <div class="tech-card">
              <h3><span class="card-icon">💅</span> Frontend</h3>
              <p><strong>Vue 3 (Composition API)</strong><br>Reactive, modular, and high-performance explorer interfaces.</p>
            </div>
            <div class="tech-card">
              <h3><span class="card-icon">🧠</span> Backend</h3>
              <p><strong>Node.js & Express</strong><br>Handles all explorer submissions and AI recommendation logic.</p>
            </div>
            <div class="tech-card">
              <h3><span class="card-icon">💾</span> Database</h3>
              <p><strong>MySQL/MariaDB</strong><br>Stores planets, moons, star data, and explorer logs.</p>
            </div>
            <div class="tech-card">
              <h3><span class="card-icon">🔑</span> Security</h3>
              <p><strong>JWT & bcrypt</strong><br>Token-based authentication and password protection.</p>
            </div>
          </div>
        </section>

        <section class="sidebar-group">
          <section class="component-showcase cosmic-panel small-panel">
            <h2>⚙️ Current Feature Showcase</h2>
            <div class="component-wrapper">
              <TestComponent />
              <p class="test-component-note">
                (The TestComponent displays current explorer logs and AI recommendations.)
              </p>
            </div>
          </section>

          <section class="quick-links cosmic-panel small-panel">
            <h2>🔗 Quick Jumps</h2>
            <ul class="link-list">
              <li><a href="/about" class="link-glow">About Poppy Universe</a></li>
              <li><a href="/explore" class="link-glow">Start Exploring</a></li>
              <li><a href="/System-Status" class="link-glow">System Status Check &rarr;</a></li>
              <li><a href="https://github.com/your-repo-link" target="_blank" class="link-glow">Source Code (GitHub)</a></li>
            </ul>
          </section>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>

  .dataflow-md {
    font-size: 0.85rem; 
    line-height: 1.4;
    max-width: 900px;   
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #c0fcfc;
    background-color: rgba(0,0,0,0.6);
    padding: 15px;
    border-radius: 8px;
  }
  /*
  |--------------------------------------------------------------------------
  | Global Container & Hero Styling (Kept the same)
  |--------------------------------------------------------------------------
  */
  .poppy-universe-home {
      padding: 20px; 
      color: #e6e6fa; 
      font-family: 'Inter', sans-serif;
      padding-bottom: 80px;
  }

  .hero { 
      text-align: center;
      padding: 100px 20px 80px; 
      margin-bottom: 50px;
  }

  .hero-title {
      font-size: 4rem; 
      font-weight: 900;
      color: #c0fcfc; 
      letter-spacing: 2px;
      text-shadow: 0 0 5px #c0fcfc, 0 0 15px #6fffe9, 0 0 25px #00ffff;
      opacity: 0;
      transform: translateY(30px) scale(0.9);
      transition: opacity 1s ease-out, transform 1s ease-out;
  }

  .hero-title.loaded {
      opacity: 1;
      transform: translateY(0) scale(1);
  }

  .universe-highlight {
      color: #ff69b4; 
      text-shadow: 0 0 5px #ff69b4, 0 0 10px #ff007f;
  }

  .hero-subtitle {
      font-size: 1.6rem;
      color: #a0f0ff; 
      margin-bottom: 40px;
      font-style: italic;
      font-weight: 300;
  }

  .cta-button {
      /* Slightly refined CTA color for a unique glow */
      background: linear-gradient(45deg, #00ffff, #007bff); 
      color: white; 
      padding: 14px 30px;
      border: none;
      border-radius: 50px; 
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
      text-transform: uppercase;
  }

  .cta-button:hover {
      background: linear-gradient(45deg, #007bff, #00ffff);
      transform: translateY(-4px) scale(1.05); 
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 123, 255, 0.5);
  }

  /*
  |--------------------------------------------------------------------------
  | Content Sections (Cosmic Panels - Layout & Shared Styles)
  |--------------------------------------------------------------------------
  */
  .content-section {
      display: flex;
      flex-direction: column; /* Stack main rows */
      align-items: center;
      gap: 50px; 
      padding: 0 20px;
  }

  /* Full width panels for Mission and Architecture */
  .large-panel {
      max-width: 1000px;
      width: 100%;
  }

  /* Two-column container for the remaining content */
  .content-row {
      display: flex;
      gap: 50px;
      max-width: 1000px;
      width: 100%;
  }

  .sidebar-group {
      display: flex;
      flex-direction: column;
      gap: 50px;
      width: 40%; /* Make the sidebar smaller */
      min-width: 300px;
  }
  .tech-overview {
      width: 60%; /* Make the tech overview larger */
  }

  /* Universal Panel Styles */
  .cosmic-panel {
      background-color: rgba(10, 0, 50, 0.85); 
      padding: 35px;
      border-radius: 10px;
      border: 1px solid #6a0dad; 
      box-shadow: 0 0 15px rgba(106, 13, 173, 0.5); 
      transition: box-shadow 0.3s, transform 0.3s;
  }

  .cosmic-panel:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 25px rgba(106, 13, 173, 0.8), 0 0 50px rgba(138, 43, 226, 0.4);
  }

  h2 {
      color: #00ffff; 
      font-size: 1.8rem;
      border-bottom: 2px solid #00ffff; 
      padding-bottom: 10px;
      margin-bottom: 25px;
      font-weight: 700;
      text-shadow: 0 0 5px rgba(0, 255, 255, 0.5); 
  }

  /*
  |--------------------------------------------------------------------------
  | Mission & Architecture Styles
  |--------------------------------------------------------------------------
  */
  .mission-text {
      line-height: 1.6;
      margin-bottom: 15px;
      color: #e0ceff;
  }
  .mission-details {
      padding: 10px;
      border-left: 4px solid #ff69b4;
      background-color: rgba(255, 105, 180, 0.05);
      font-size: 0.95rem;
      color: #ffb6c1;
      margin-top: 15px;
  }

  .feature-list {
      list-style: none;
      padding: 0;
      margin-top: 10px;
  }

  .feature-list li {
      margin-bottom: 8px;
      font-size: 1rem;
      color: #c0fcfc;
  }

  .bullet-glow {
      color: #00ffff;
      margin-right: 8px;
      text-shadow: 0 0 5px #00ffff;
  }

  .diagram-placeholder {
      margin-top: 25px;
      padding: 20px;
      border: 1px dashed #00ffff;
      border-radius: 10px;
      background-color: rgba(0, 255, 255, 0.05);
      text-align: center;
  }


  /*
  |--------------------------------------------------------------------------
  | Technology Overview Styles
  |--------------------------------------------------------------------------
  */
  .tech-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
  }

  .tech-card {
      background-color: rgba(255, 255, 255, 0.05); 
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 255, 255, 0.2);
      transition: background-color 0.3s;
  }

  .tech-card:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }

  .tech-card h3 {
      font-size: 1.2rem;
      color: #ff69b4; 
      border-bottom: 1px dashed rgba(255, 105, 180, 0.5);
      padding-bottom: 5px;
      margin-bottom: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
  }

  .card-icon {
      font-size: 1.1em;
      margin-right: 8px;
      color: #00ffff;
  }

  .tech-card p {
      font-size: 0.9rem;
      color: #e6e6fa;
  }

  .tech-card p strong {
      color: #00ffff;
      font-weight: 700;
  }


  /*
  |--------------------------------------------------------------------------
  | Showcase and Link Styles 
  |--------------------------------------------------------------------------
  */
  .component-wrapper {
      padding: 25px;
      border: 2px dashed #ff69b4; 
      border-radius: 15px;
      background-color: rgba(5, 0, 30, 0.6); 
  }

  .test-component-note {
      color: #ffb6c1; 
      margin-top: 15px;
      font-size: 0.95rem;
  }

  .quick-links ul {
      list-style: none;
      padding: 0;
  }

  .quick-links li {
      margin-bottom: 15px; 
  }

  .link-glow {
      color: #ff69b4; 
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s, text-shadow 0.3s;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 5px;
  }

  .link-glow:hover {
      color: #ffffff; 
      text-decoration: none;
      text-shadow: 0 0 8px #ff007f;
      background-color: rgba(255, 105, 180, 0.1); 
  }

  /*
  |--------------------------------------------------------------------------
  | Media Queries 
  |--------------------------------------------------------------------------
  */
  @media (max-width: 1050px) {
      .content-row {
          flex-direction: column; /* Stack columns vertically */
          gap: 30px;
      }
      .tech-overview, .sidebar-group {
          width: 100%; 
          max-width: 480px; /* Limit width on mid-size screens */
      }
  }

  @media (max-width: 768px) {
      .hero-title {
          font-size: 2.8rem;
      }
      .hero-subtitle {
          font-size: 1.2rem;
      }
      .content-section {
          gap: 30px;
      }
      .cosmic-panel {
          max-width: 100%;
      }
      .tech-grid {
          grid-template-columns: 1fr; /* Stack tech cards vertically on mobile */
      }
  }
</style>