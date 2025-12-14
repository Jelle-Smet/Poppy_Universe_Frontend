<template>
  <div class="my-stars-container">
    <h1>Stellar Vault 🌟</h1>
    <p class="intro">
      Greetings, cosmic explorer! Step into your personal vault of stars in Poppy Universe.
      Each glowing orb represents a star you own—its color shows its type, and its brightness reflects luminosity.
    </p>

    <div class="stars-grid">
      <div class="star-card" v-for="star in stars" :key="star.Star_ID">
        <div
          class="star-orb"
          :style="{
            backgroundColor: starColor(star.Star_SpType),
            boxShadow: starLuminosityGlow(star.Star_Luminosity, starColor(star.Star_SpType))
          }"
        ></div>

        <div class="star-info">
          <p><span class="label">Name:</span> {{ star.Star_Name || 'Unknown' }}</p>
          <p><span class="label">Type:</span> {{ star.Star_SpType || 'Unknown' }}</p>
          <p><span class="label">Luminosity:</span> {{ formatNumber(star.Star_Luminosity) }}</p>
          <p><span class="label">Mass:</span> {{ formatNumber(star.Star_Mass) }}</p>
          <p><span class="label">Age:</span> {{ formatNumber(star.Star_Age) }}</p>
          <p><span class="label">Radial Velocity:</span> {{ star.Star_RV_Category || 'Unknown' }}</p>

          <button class="details-button" @click="goToStar(star.Star_ID)">
            Open Star Details ✨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const stars = ref([]);
    const router = useRouter();

    // Get a better color based on Teff (temperature), SpType, or BPMag/RPMag if needed
    const starColor = (star) => {
      // If Teff exists, we can approximate the star's color in RGB
      if (star.Star_Teff) {
        let temp = star.Star_Teff;
        // Simple black-body approximation (rough)
        let r = 255, g = 255, b = 255;

        if (temp < 3500) { r = 255; g = 140; b = 60; }          // Red-ish
        else if (temp < 5000) { r = 255; g = 200; b = 160; }   // Orange
        else if (temp < 6000) { r = 255; g = 255; b = 200; }   // Yellow
        else if (temp < 7500) { r = 200; g = 220; b = 255; }   // White-blue
        else { r = 155; g = 180; b = 255; }                    // Blue
        return `rgb(${r},${g},${b})`;
      }
      // Fallback to spectral type if Teff missing
      switch (star.Star_SpType) {
        case 'O': return '#9bb0ff';
        case 'B': return '#aabfff';
        case 'A': return '#cad7ff';
        case 'F': return '#f8f7ff';
        case 'G': return '#fff4ea';
        case 'K': return '#ffd2a1';
        case 'M': return '#ffcc6f';
        default: return '#ffffff';
      }
    };

    // Scale luminosity to a glow around the orb
    const starLuminosityGlow = (lum, color) => {
      if (!lum) return '0 0 10px rgba(255,255,255,0.3)';
      const intensity = Math.min(Math.sqrt(lum) * 5, 50); // visually scale
      return `0 0 ${intensity}px ${color}`;
    };

    // Round numbers to 2 digits, handle unknown
    const formatNumber = (num) => {
      if (num === null || num === undefined) return 'Unknown';
      return Number(num).toFixed(2);
    };

    const fetchStars = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/stars/mystars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch stars');

        const data = await res.json();
        stars.value = data.stars;
      } catch (err) {
        console.error(err);
      }
    };

    const goToStar = (id) => {
      router.push(`/star/${id}`);
    };

    const viewOnMap = (id) => {
      // Placeholder for later interactive map
      router.push(`/map/${id}`);
    };

    onMounted(() => {
      fetchStars();
    });

    return {
      stars,
      starColor,
      starLuminosityGlow,
      formatNumber,
      goToStar,
      viewOnMap,
    };
  },
};
</script>


<style scoped>
.my-stars-container {
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  text-shadow: 0 0 15px rgba(125, 95, 255, 0.7);
}

.intro {
  font-size: 1.2rem;
  margin-bottom: 45px;
  opacity: 0.9;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.stars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  justify-items: center;
  width: 100%;
}

.star-card {
  display: flex;
  align-items: center;
  background: rgba(10, 10, 30, 0.98);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.4),
              0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.star-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 35px rgba(125, 95, 255, 0.7),
              0 20px 50px rgba(0, 0, 0, 0.6);
}

.star-orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 25px;
  flex-shrink: 0;
  transition: box-shadow 0.3s ease;
}

.star-info {
  text-align: left;
}

.label {
  font-weight: 600;
  color: #9aa4ff;
  margin-right: 4px;
}

.details-button {
  margin-top: 12px;
  padding: 10px 18px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 89, 107, 0.6),
              0 0 35px rgba(255, 125, 95, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.details-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 25px rgba(255, 89, 107, 0.9),
              0 0 50px rgba(255, 125, 95, 0.6);
}
</style>
