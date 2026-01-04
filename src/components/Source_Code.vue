<template>
  <Transition name="cosmic-reveal">
    <div 
      v-if="isVisible" 
      class="modal-overlay" 
      @click.self="$emit('close')"
    >
      <div class="modal-container">
        <!-- Close Button -->
        <button 
          @click="$emit('close')" 
          class="close-button"
          aria-label="Close modal"
        >
          ×
        </button>

        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="title-icon">🚀</span>
            Source Code Repository
          </h2>
          <p class="modal-subtitle">
            Access the complete architecture behind Poppy Universe
          </p>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Full Project Section -->
          <div class="full-project-section">
            <div class="section-label">
              <span class="label-icon">🌌</span>
              Complete Integrated Project
            </div>
            <p class="section-description">
              Looking for the entire Poppy Universe in one place? Access the full integrated codebase, documentation, and architecture.
            </p>
            <a 
              href="https://github.com/Jelle-Smet/The_Poppy_Universe.git" 
              target="_blank" 
              rel="noopener noreferrer"
              class="primary-button"
            >
              <span class="button-icon">⭐</span>
              View Full Project on GitHub
              <span class="button-arrow">→</span>
            </a>
          </div>

          <!-- Divider -->
          <div class="divider">
            <span class="divider-text">OR EXPLORE INDIVIDUAL COMPONENTS</span>
          </div>

          <!-- Individual Components -->
          <div class="components-section">
            <p class="components-intro">
              Need something specific? Browse individual repositories for detailed, standalone implementations:
            </p>
            
            <div class="components-grid">
              <a 
                v-for="repo in repositories" 
                :key="repo.name"
                :href="repo.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="component-card"
              >
                <div class="card-icon">{{ repo.icon }}</div>
                <div class="card-content">
                  <h3 class="card-title">{{ repo.name }}</h3>
                  <p class="card-description">{{ repo.description }}</p>
                </div>
                <div class="card-arrow">→</div>
              </a>
            </div>
          </div>

          <!-- Data Note -->
          <div class="data-note">
            <div class="note-icon">💾</div>
            <div class="note-content">
              <strong>Note on Gaia Data:</strong> 
              Due to file size limitations, Gaia DR3 star data is hosted on Aiven (MySQL). 
              Connection logic and schema are available in the Backend repository.
            </div>
          </div>

          <!-- Intellectual Property Notice -->
          <div class="ip-notice">
            <div class="note-icon">⚖️</div>
            <div class="note-content">
                <strong>Intellectual Property & Usage:</strong> 
                All code, architecture, and documentation in Poppy Universe are the intellectual property of the project creator. 
                This work is shared for <strong>educational and portfolio purposes</strong>. 
                While you're welcome to learn from and reference this project, please respect the original work—
                <strong>do not copy, redistribute, or claim it as your own</strong>. 
                If you're inspired by this project, we encourage you to build something original! 
                For collaboration or usage inquiries, please reach out through the 
                
                <router-link to="/contact_hub" class="contact-link">Contact hub</router-link>.
                </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps(['isVisible']);
defineEmits(['close']);

const repositories = [
  {
    name: 'Backend',
    icon: '🔧',
    description: 'Node.js API, database connections, authentication',
    url: 'https://github.com/Jelle-Smet/Poppy_Universe_Backend.git'
  },
  {
    name: 'Frontend',
    icon: '🎨',
    description: 'Vue 3 interface, components, user experience',
    url: 'https://github.com/Jelle-Smet/Poppy_Universe_Frontend.git'
  },
  {
    name: 'ML Models',
    icon: '🤖',
    description: 'Neural networks, matrix factorization, predictions',
    url: 'https://github.com/Jelle-Smet/Poppy_Universe_Machine_Learning.git'
  },
  {
    name: 'Recommendation Engine',
    icon: '⚡',
    description: 'Multi-layer algorithm system, genetic fusion',
    url: 'https://github.com/Jelle-Smet/Poppy_Universe_Engine.git'
  },
  {
    name: 'Data Notebooks',
    icon: '📊',
    description: 'ETL pipelines, data cleaning, research analysis',
    url: 'https://github.com/Jelle-Smet/Poppy_Universe_Data_Notebooks.git'
  }
];
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
}

/* Modal Container */
.modal-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(10, 0, 50, 0.95), rgba(30, 0, 80, 0.95));
  border: 2px solid rgba(106, 13, 173, 0.5);
  border-radius: 20px;
  box-shadow: 
    0 0 60px rgba(106, 13, 173, 0.4),
    0 0 120px rgba(138, 43, 226, 0.2),
    inset 0 0 80px rgba(0, 255, 255, 0.03);
}

/* Close Button */
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #c0fcfc;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.close-button:hover {
  background: rgba(255, 105, 180, 0.2);
  border-color: #ff69b4;
  color: #fff;
  transform: rotate(90deg);
}

/* Header */
.modal-header {
  padding: 40px 40px 30px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #c0fcfc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.title-icon {
  font-size: 2.2rem;
}

.modal-subtitle {
  font-size: 1.1rem;
  color: #a0f0ff;
  font-style: italic;
  font-weight: 300;
}

/* Content */
.modal-content {
  padding: 40px;
}

/* Full Project Section */
.full-project-section {
  background: rgba(0, 255, 255, 0.05);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 35px;
  text-align: center;
}

.section-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.label-icon {
  font-size: 1.2rem;
}

.section-description {
  color: #e0ceff;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 35px;
  background: linear-gradient(45deg, #00ffff, #007bff);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

.primary-button:hover {
  background: linear-gradient(45deg, #007bff, #00ffff);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 123, 255, 0.3);
}

.button-icon {
  font-size: 1.3rem;
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.primary-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 40px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 105, 180, 0.5),
    transparent
  );
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 20px;
  background: linear-gradient(135deg, rgba(10, 0, 50, 0.95), rgba(30, 0, 80, 0.95));
  color: #ff69b4;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
}

/* Components Section */
.components-section {
  margin-bottom: 30px;
}

.components-intro {
  color: #e0ceff;
  font-size: 0.95rem;
  margin-bottom: 20px;
  text-align: center;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
}

.component-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 105, 180, 0.2);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.component-card:hover {
  background: rgba(255, 105, 180, 0.08);
  border-color: #ff69b4;
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(255, 105, 180, 0.3);
}

.card-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  color: #c0fcfc;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.card-description {
  color: #a0f0ff;
  font-size: 0.85rem;
  line-height: 1.4;
}

.card-arrow {
  font-size: 1.5rem;
  color: #ff69b4;
  flex-shrink: 0;
  opacity: 0.6;
  transition: all 0.3s;
}

.component-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* Data Note */
.data-note {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 193, 7, 0.05);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 12px;
  align-items: flex-start;
}

/* Intellectual Property Notice */
.ip-notice {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: rgba(138, 43, 226, 0.05);
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 12px;
  align-items: flex-start;
  margin-top: 20px;
}

.note-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.note-content {
  color: #e0ceff;
  font-size: 0.9rem;
  line-height: 1.6;
}

.note-content strong {
  color: #ffc107;
  font-weight: 700;
}

/* Animation */
.cosmic-reveal-enter-active,
.cosmic-reveal-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cosmic-reveal-enter-from,
.cosmic-reveal-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}

.cosmic-reveal-enter-active .modal-container,
.cosmic-reveal-leave-active .modal-container {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cosmic-reveal-enter-from .modal-container,
.cosmic-reveal-leave-to .modal-container {
  transform: scale(0.9) rotateX(10deg);
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    padding: 25px;
  }

  .modal-title {
    font-size: 1.8rem;
  }

  .components-grid {
    grid-template-columns: 1fr;
  }

  .component-card {
    padding: 15px;
  }
}

/* Scrollbar Styling */
.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.3);
  border-radius: 10px;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 255, 0.5);
}

.contact-link {
  color: #818cf8; /* A nice indigo that fits the space theme */
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.contact-link:hover {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(129, 140, 248, 0.8);
  border-bottom: 1px solid #818cf8;
}
</style>