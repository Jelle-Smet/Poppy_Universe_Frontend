<template>
  <div id="main-layout">
    <Navbar />

    <canvas id="starfield"></canvas>

    <div class="logo-overlay" :style="logoOverlayStyle"></div>

    <main class="content-wrapper">
      <router-view />
    </main>

    <DisclaimerBanner />

    <LoginPopup v-if="showLoginPopup" />

    <Footer />
  </div>
</template>

<script>
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import LoginPopup from '../components/Login_Popup.vue';
import DisclaimerBanner from '../components/Disclaimer_Banner.vue';
import PoppyUniverseLogo from '../assets/images/Poppy_Universe_Logo.png';
import { checkTokenValidity } from '../utils/auth.js'; // Import the auth checker

export default {
  components: {
    Navbar,
    Footer,
    LoginPopup,
    DisclaimerBanner,
  },
  computed: {
    logoOverlayStyle() {
      return {
        'background-image': `url(${PoppyUniverseLogo})`,
      };
    },
  },
  setup() {
    const route = useRoute();
    
    const isTokenValid = ref(false);
    const isCheckingToken = ref(true);

    // Validate token on mount and route changes
    const validateToken = async () => {
      isCheckingToken.value = true;
      isTokenValid.value = await checkTokenValidity();
      isCheckingToken.value = false;
      console.log('Token valid:', isTokenValid.value);
    };

    // Helper function to check if current route is public
    const isPublicRoute = computed(() => {
      const publicPaths = ['/', '/sign-up-login'];
      const publicNames = ['Home', 'signUpLogin'];
      
      return publicPaths.includes(route.path) || publicNames.includes(route.name);
    });

    // SECURITY LOGIC - Show login popup if token is invalid and not on public page
    const showLoginPopup = computed(() => {
      // Don't show popup while checking token
      if (isCheckingToken.value) return false;
      
      const shouldShow = !isTokenValid.value && !isPublicRoute.value;
      console.log('Should show login popup:', shouldShow);
      return shouldShow;
    });

    // UX POLISH: Stop scrolling when popup is visible
    watch(showLoginPopup, (shouldBlock) => {
      document.body.style.overflow = shouldBlock ? 'hidden' : 'auto';
    }, { immediate: true });

    onMounted(() => {
      console.log('Main Layout mounted');
      validateToken(); // Check token on mount
      
      // Re-validate token when route changes
      watch(() => route.path, () => {
        console.log('Route changed to:', route.path);
        validateToken();
      });

      // Listen for storage events (e.g., logout in another tab)
      window.addEventListener('storage', validateToken);

      // Starfield Logic
      const canvas = document.getElementById('starfield');
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        stars.forEach((s) => {
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
          s.x += s.vx; s.y += s.vy;
          if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
          if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
        });
        requestAnimationFrame(draw);
      };
      draw();
    });

    onUnmounted(() => {
      window.removeEventListener('storage', validateToken);
    });

    return { showLoginPopup };
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Arial', sans-serif;
  overflow-x: hidden;
  /* height: 100% ❌ remove this */
  min-height: 100%; /* optional */
}


#main-layout {
  position: relative;
  min-height: 100vh;
  width: 100%;
  /* overflow: hidden;  ← remove this */
  overflow-x: hidden;   /* keep this safe */
  overflow-y: auto;     /* allow scrolling */
}

.content-wrapper {
  position: relative;
  z-index: 10;
  overflow-y: auto; /* extra safety */
}


/* PURPLE SPACE BACKGROUND */
#main-layout::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 20%, #3b0b65, #1a0330, #0a0018);
  z-index: -3;
}

/* STARFIELD CANVAS */
#starfield {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
}

.logo-overlay {
  position: fixed;
  top: 50%;
  left: 55.5%;
  transform: translate(-50%, -50%);
  opacity: 0.35;
  width: 90%;
  max-width: 800px;
  height: 90vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
  z-index: -1;
  
  /* --- NEW CODE TO CREATE THE FADING EDGE --- */
  mask-image: radial-gradient(
    circle at center,
    white 50%, /* Logo is fully visible (white) in the center */
    transparent 100% /* Logo fades completely (transparent) at the edge */
  );
  /* Fallback for older browsers (or if mask-image causes issues) */
  -webkit-mask-image: radial-gradient(
    circle at center,
    white 50%,
    transparent 100%
  );
}

/* CONTENT ABOVE EVERYTHING */
.content-wrapper {
  position: relative;
  z-index: 10;
}


</style>
