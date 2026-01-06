<template>
  <div class="logout-outer">
    <div class="logout-card">
      <div class="icon-container">
        <div class="orbit-ring"></div>
        <div class="icon">👋</div>
      </div>

      <h2>Departing Poppy Universe</h2>
      
      <div v-if="isLoggingOut" class="status-message">
        <div class="spinner"></div>
        <p>Disengaging hyperdrive systems...</p>
      </div>

      <div v-else-if="logoutSuccess" class="status-message success">
        <p>✨ Logout successful! Safe travels, Explorer.</p>
        <p class="redirect-notice">Returning to home sector in {{ countdown }}...</p>
      </div>

      <div v-else class="logout-confirm">
        <p class="warning-text">Are you sure you want to exit your exploration session?</p>
        
        <div class="action-buttons">
          <button @click="confirmLogout" class="logout-btn">
            Yes, Log Me Out
          </button>
          <button @click="cancelLogout" class="cancel-btn">
            Stay in Orbit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { clearAuth } from '../utils/auth.js';

export default {
  name: 'LogoutPage',
  setup() {
    const router = useRouter();
    const isLoggingOut = ref(false);
    const logoutSuccess = ref(false);
    const countdown = ref(3);

    const confirmLogout = async () => {
      isLoggingOut.value = true;

      // Simulate logout process (you can add API call here if needed)
      setTimeout(() => {
        // Clear all auth data
        clearAuth();
        
        // Also dispatch storage event to notify other components
        window.dispatchEvent(new Event('storage'));

        isLoggingOut.value = false;
        logoutSuccess.value = true;

        // Countdown redirect
        const interval = setInterval(() => {
          countdown.value--;
          if (countdown.value === 0) {
            clearInterval(interval);
            router.push('/');
          }
        }, 1000);
      }, 1500);
    };

    const cancelLogout = () => {
      router.push('/'); // Go back to home without logging out
    };

    // Auto-check: if already logged out, redirect immediately
    onMounted(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/');
      }
    });

    return {
      isLoggingOut,
      logoutSuccess,
      countdown,
      confirmLogout,
      cancelLogout
    };
  }
};
</script>

<style scoped>
.logout-outer {
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e6f7ff;
  padding: 20px;
}

.logout-card {
  width: 90%;
  max-width: 500px;
  padding: 50px 40px;
  backdrop-filter: blur(15px);
  background: rgba(10, 10, 30, 0.85);
  border: 2px solid #5d5dff;
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(93, 93, 255, 0.8);
  text-align: center;
  transition: transform 0.3s ease;
}

.logout-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 50px rgba(93, 93, 255, 1);
}

/* Icon with orbiting ring */
.icon-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.orbit-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #5d5dff;
  border-right-color: #5d5dff;
  border-radius: 50%;
  animation: orbit 2s linear infinite;
}

@keyframes orbit {
  to { transform: rotate(360deg); }
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
}

h2 {
  font-size: 1.8rem;
  color: #a8c4ff;
  text-shadow: 0 0 10px #7c7cff;
  margin-bottom: 25px;
}

.status-message {
  margin-top: 20px;
}

.status-message p {
  font-size: 1.1rem;
  color: #c9cfff;
  margin: 10px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 4px solid rgba(93, 93, 255, 0.3);
  border-top-color: #5d5dff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message.success p {
  color: #59ff6b;
  font-weight: bold;
}

.redirect-notice {
  font-size: 0.95rem;
  color: #b0c4de;
  margin-top: 15px;
}

.logout-confirm {
  margin-top: 20px;
}

.warning-text {
  font-size: 1.1rem;
  color: #ffb56b;
  margin-bottom: 30px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.logout-btn,
.cancel-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.5px;
  min-width: 180px;
}

.logout-btn {
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: white;
}

.logout-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 89, 107, 0.8);
  background: linear-gradient(135deg, #ff7d5f, #ff596b);
}

.cancel-btn {
  background: linear-gradient(135deg, #596bff, #7d5fff);
  color: white;
}

.cancel-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(93, 93, 255, 0.8);
  background: linear-gradient(135deg, #7d5fff, #596bff);
}

/* Responsive */
@media (max-width: 600px) {
  .logout-card {
    padding: 40px 25px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .logout-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>