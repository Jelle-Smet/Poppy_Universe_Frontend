<template>
  <div v-if="planet" class="planet-detail-container">
    <div class="planet-header">
      
      <div class="header-left-group">
        <div class="planet-visual-container">
          <p class="planet-intro">Appearance of this Planet:</p>
          <div class="planet-display">
            <div
              class="planet-orb"
              :class="planetClass"
              :style="planetStyle"
              title="Visual representation based on planet characteristics"
            >
              <!-- Earth continents and clouds -->
              <div v-if="planet.Planet_ID === 4" class="earth-continents"></div>
              <div v-if="planet.Planet_ID === 4" class="earth-clouds"></div>
              
              <!-- Jupiter bands -->
              <div v-if="planet.Planet_ID === 6" class="jupiter-bands">
                <div class="band band-1"></div>
                <div class="band band-2"></div>
                <div class="band band-3"></div>
                <div class="band band-4"></div>
                <div class="great-red-spot"></div>
              </div>
              
              <!-- Mars polar caps -->
              <div v-if="planet.Planet_ID === 5" class="mars-polar-cap mars-north"></div>
              <div v-if="planet.Planet_ID === 5" class="mars-polar-cap mars-south"></div>
              
              <!-- Neptune storms -->
              <div v-if="planet.Planet_ID === 9" class="neptune-spot"></div>
              
              <!-- Uranus tilt indicator -->
              <div v-if="planet.Planet_ID === 8" class="uranus-bands"></div>
            </div>
            
            <!-- Saturn's Rings -->
           <div v-if="planet.Planet_ID === 7" class="saturn-ring-system">
              <div class="ring outer-ring"></div>
              <div class="ring middle-ring"></div>
              <div class="ring inner-ring"></div>
            </div>

            <!-- Uranus Rings -->
            <div v-if="planet.Planet_ID === 8" class="uranus-ring-system">
              <div class="ring-thin"></div>
            </div>
          </div>
        </div>

        <div class="planet-title">
          <p class="planet-name-label">Planet Name:</p>
          <h1>{{ planet.Planet_Name || 'Unknown Planet' }}</h1>
          <p class="planet-type"><strong>Type:</strong> {{ planet.Planet_Type || 'Unknown Type' }}</p>
          <p class="planet-color"><strong>Color:</strong> {{ planet.Planet_Color || 'Unknown' }}</p>
        </div>
      </div>

      <div class="planet-buttons">
        <button class="map-btn" @click="viewOnMap">View on Interactive Map 🪐</button>
        <button class="like-btn" @click="toggleLike">
          {{ isLiked ? '💔 Unlike this planet' : '🌍 Like this planet 🌍' }}
        </button>

        <div class="rating-box">
          <p class="rate-label">Rate this Planet:</p>
          
          <div class="rate-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= userRating }"
              @click="setRating(n)"
            >★</span>
          </div>
          <p v-if="ratingMessage" class="rating-success">
            {{ ratingMessage }}
          </p>
          <button class="send-rating-btn" @click="submitRating">Send Rating</button>
        </div>
      </div>
    </div>

    <div class="planet-info-grid">
      <div class="info-card" v-for="(value, label) in planetData" :key="label">
        <span class="label">{{ label }}:</span> 
        <span class="value">{{ formatValue(value, label) }}</span>
      </div>
    </div>

    <div class="owner-info">
      <h2>Owner Info</h2>
      <p><strong>Name:</strong> Poppy</p>
      <p><strong>Username:</strong> @poppy_space</p>
    </div>
  </div>

  <div v-else class="loading">Loading Planet...</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PlanetDetail',
  setup() {
    const planet = ref(null);
    const router = useRouter();
    const isLiked = ref(false);
    const ratingMessage = ref('');

    const axiosWithAuth = axios.create({
      baseURL: 'http://localhost:5000',
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchPlanet = async () => {
      try {
        const planetId = parseInt(window.location.pathname.split('/')[2]);
        const response = await axiosWithAuth.get(`/api/planets/${planetId}`);
        planet.value = response.data.planet;

        const likeStatus = await axiosWithAuth.get(`/api/likes/status?type=Planet&id=${planetId}`);
        isLiked.value = likeStatus.data.isLiked;

      } catch (err) {
        console.error('Failed to fetch planet:', err);
      }
    };

    onMounted(fetchPlanet);

    const formatValue = (val, label) => {
      if (val === null || val === undefined) return 'Missing';
      if (label === 'Has Rings' || label === 'Has Magnetic Field') {
        return val ? 'Yes' : 'No';
      }
      if (typeof val === 'number') {
        // Handle very large numbers with scientific notation
        if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.01 && val !== 0)) {
          return val.toExponential(2);
        }
        // Format large numbers with commas
        if (Math.abs(val) >= 1000) {
          return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        return val.toFixed(2);
      }
      return val;
    };

    const planetClass = computed(() => {
      if (!planet.value) return '';
      const id = planet.value.Planet_ID;
      return `planet-${id}`;
    });

    const planetStyle = computed(() => {
      if (!planet.value) return {};
      
      const colorMap = {
        2: 'radial-gradient(circle at 30% 30%, #a0a0a0, #888, #606060), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.1) 0%, transparent 20%)',
        3: 'radial-gradient(circle at 30% 30%, #d4b896, #a08060, #7a5f47)',
        4: 'radial-gradient(circle at 30% 30%, #4a90e2, #2e5f8f, #1a3a5f)',
        5: 'radial-gradient(circle at 30% 30%, #e27b58, #c1632f, #8b4513)',
        6: 'radial-gradient(circle at 30% 30%, #d4a76a, #c19456, #a67c52)',
        7: 'radial-gradient(circle at 30% 30%, #f4e7d7, #d4c5a0, #b8a080)',
        8: 'radial-gradient(circle at 30% 30%, #4fd0e7, #3ba3c1, #2a7f99)',
        9: 'radial-gradient(circle at 30% 30%, #4169e1, #2e4a9e, #1e3a7a)',
        10: 'radial-gradient(circle at 30% 30%, #d4c5b0, #a0927e, #7a6f5f), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        11: 'radial-gradient(circle at 30% 30%, #8b7d6b, #6e5f4e, #5a4d3e)',
        12: 'radial-gradient(circle at 30% 30%, #d4d4d4, #a0a0a0, #7a7a7a)',
        13: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #c0c0c0)',
        14: 'radial-gradient(circle at 30% 30%, #a0635f, #7a4a47, #5f3836)'
      };
      if (planet.value.Planet_ID === 4) {
            return {
                background: colorMap[4],
                animation: 'rotate 180s linear infinite' // Earth rotates slower than your 120s default
            };
        }

      return {
        background: colorMap[planet.value.Planet_ID] || '#ffffff'
      };
    });

    const planetData = computed(() => {
      if (!planet.value) return {};
      return {
        'Type': planet.value.Planet_Type,
        'Magnitude': planet.value.Planet_Magnitude,
        'Color': planet.value.Planet_Color,
        'Distance from Sun (AU)': planet.value.Planet_Distance_From_Sun,
        'Distance from Earth (AU)': planet.value.Planet_Distance_From_Earth,
        'Diameter (km)': planet.value.Planet_Diameter,
        'Mass (Earth masses)': planet.value.Planet_Mass,
        'Orbital Period (days)': planet.value.Planet_Orbital_Period,
        'Orbital Inclination (°)': planet.value.Planet_Orbital_Inclination,
        'Semi-Major Axis (AU)': planet.value.Planet_SemiMajorAxisAU,
        'Longitude Ascending Node (°)': planet.value.Planet_Longitude_Ascending_Node,
        'Argument Periapsis (°)': planet.value.Planet_Argument_Periapsis,
        'Mean Anomaly (°)': planet.value.Planet_Mean_Anomaly,
        'Mean Temperature (K)': planet.value.Planet_Mean_Temperature,
        'Number of Moons': planet.value.Planet_Number_of_Moons,
        'Has Rings': planet.value.Planet_Has_Rings,
        'Has Magnetic Field': planet.value.Planet_Has_Magnetic_Field,
      };
    });

    const userRating = ref(0);
    const setRating = (n) => {
      userRating.value = n;
    };

    const submitRating = async () => {
      try {
        await axiosWithAuth.post('/api/interactions/rate', {
          objectType: 'Planet',
          objectId: planet.value.Planet_ID,
          rating: userRating.value
        });

        ratingMessage.value = '🪐 Successfully rated this planet!';
        setTimeout(() => {
          ratingMessage.value = '';
        }, 2500);

      } catch (err) {
        console.error('Error sending rating:', err);
      }
    };

    const toggleLike = async () => {
      if (!planet.value) return;
      try {
        const likeResp = await axiosWithAuth.post('/api/likes/toggle', {
          objectType: 'Planet',
          objectId: planet.value.Planet_ID
        });
        isLiked.value = likeResp.data.liked;

        if (isLiked.value) {
          await axiosWithAuth.post('/api/interactions/like', {
            objectType: 'Planet',
            objectId: planet.value.Planet_ID
          });
        }

      } catch (err) {
        console.error('Error toggling like:', err);
      }
    };

    const viewOnMap = () => {
      router.push(`/interactive-map/planet/${planet.value.Planet_ID}`);
    };

    return {
      planet,
      isLiked,
      userRating,
      setRating,
      submitRating,
      toggleLike,
      viewOnMap,
      planetClass,
      planetStyle,
      planetData,
      formatValue,
      ratingMessage
    };
  },
};
</script>

<style scoped>
.planet-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.loading {
  text-align: center;
  font-size: 2rem;
  margin-top: 5rem;
}

.planet-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between; 
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  background-color: rgba(0,0,30,0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
}

.header-left-group {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.planet-visual-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.planet-intro, .planet-name-label {
  font-size: 1.1rem;
  color: rgba(180, 160, 255, 0.8);
  font-weight: 600;
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.4);
  margin-bottom: 0.5rem;
}

.planet-display {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 30px rgba(0,0,0,0.5), 
    inset -15px -15px 40px rgba(0,0,0,0.4),
    0 0 10px rgba(154, 164, 255, 0.2);
  animation: rotate 120s linear infinite;
}

.planet-3 {
  box-shadow: 0 0 25px rgba(227, 187, 118, 0.4), inset -15px -15px 40px rgba(0,0,0,0.4) !important;
}

.planet-9 {
  box-shadow: 0 0 25px rgba(65, 105, 225, 0.4), inset -15px -15px 40px rgba(0,0,0,0.4) !important;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Earth specific features */
.earth-continents {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    /* North America */
    radial-gradient(ellipse 20px 32px at 26% 32%, #2d5a2d 50%, transparent 50%),
    radial-gradient(ellipse 14px 22px at 30% 26%, #3d6a3d 50%, transparent 50%),
    radial-gradient(ellipse 16px 18px at 24% 40%, #3d6a3d 50%, transparent 50%),
    /* Central America bridge */
    radial-gradient(ellipse 6px 12px at 30% 48%, #2d5a2d 50%, transparent 50%),
    /* South America */
    radial-gradient(ellipse 12px 26px at 34% 60%, #2d5a2d 50%, transparent 50%),
    radial-gradient(ellipse 10px 18px at 37% 58%, #3d6a3d 50%, transparent 50%),
    /* Greenland */
    radial-gradient(ellipse 10px 14px at 38% 18%, #e8f0e8 50%, transparent 50%),
    /* Europe */
    radial-gradient(ellipse 10px 12px at 52% 28%, #2d5a2d 50%, transparent 50%),
    radial-gradient(ellipse 8px 10px at 56% 26%, #3d6a3d 50%, transparent 50%),
    /* Africa */
    radial-gradient(ellipse 18px 28px at 54% 48%, #4a7a4a 50%, transparent 50%),
    radial-gradient(ellipse 16px 22px at 52% 38%, #3d6a3d 50%, transparent 50%),
    /* Arabia */
    radial-gradient(ellipse 8px 12px at 60% 40%, #c4b896 50%, transparent 50%),
    /* Madagascar */
    radial-gradient(ellipse 4px 8px at 60% 58%, #2d5a2d 50%, transparent 50%),
    /* Asia - Siberia/Russia */
    radial-gradient(ellipse 28px 22px at 70% 26%, #3d6a3d 50%, transparent 50%),
    radial-gradient(ellipse 20px 18px at 76% 22%, #2d5a2d 50%, transparent 50%),
    /* Asia - India/Southeast */
    radial-gradient(ellipse 10px 14px at 68% 42%, #4a7a4a 50%, transparent 50%),
    radial-gradient(ellipse 12px 10px at 74% 46%, #3d6a3d 50%, transparent 50%),
    /* Asia - China/East */
    radial-gradient(ellipse 16px 20px at 76% 34%, #3d6a3d 50%, transparent 50%),
    /* Japan arc */
    radial-gradient(ellipse 4px 10px at 82% 36%, #2d5a2d 50%, transparent 50%),
    /* Australia */
    radial-gradient(ellipse 14px 12px at 80% 64%, #c4936f 50%, transparent 50%),
    radial-gradient(ellipse 10px 8px at 78% 66%, #4a7a4a 50%, transparent 50%),
    /* New Zealand */
    radial-gradient(ellipse 3px 6px at 88% 72%, #2d5a2d 50%, transparent 50%),
    /* Antarctica (bottom ice cap) */
    radial-gradient(ellipse 45px 18px at 50% 88%, #f0f8ff 50%, transparent 50%);
  opacity: 0.9;
}

.earth-clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    /* Clouds over Pacific */
    radial-gradient(ellipse 35px 14px at 18% 35%, rgba(255,255,255,0.5) 50%, transparent 50%),
    radial-gradient(ellipse 28px 12px at 14% 52%, rgba(255,255,255,0.48) 50%, transparent 50%),
    /* Clouds over Atlantic */
    radial-gradient(ellipse 32px 15px at 42% 24%, rgba(255,255,255,0.52) 50%, transparent 50%),
    radial-gradient(ellipse 26px 13px at 40% 46%, rgba(255,255,255,0.5) 50%, transparent 50%),
    /* Clouds over Africa/Indian Ocean */
    radial-gradient(ellipse 30px 14px at 62% 50%, rgba(255,255,255,0.48) 50%, transparent 50%),
    /* Clouds over Asia/Pacific */
    radial-gradient(ellipse 34px 16px at 80% 32%, rgba(255,255,255,0.5) 50%, transparent 50%),
    radial-gradient(ellipse 28px 13px at 84% 56%, rgba(255,255,255,0.49) 50%, transparent 50%),
    /* Tropical clouds */
    radial-gradient(ellipse 24px 11px at 26% 48%, rgba(255,255,255,0.46) 50%, transparent 50%),
    /* Arctic clouds */
    radial-gradient(ellipse 30px 12px at 45% 14%, rgba(255,255,255,0.54) 50%, transparent 50%);
  animation: drift 60s linear infinite;
}

@keyframes drift {
  from { transform: translateX(0); }
  to { transform: translateX(10px); }
}

/* Jupiter bands and Great Red Spot */
.jupiter-bands {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.band {
  position: absolute;
  width: 120%;
  height: 15px;
  left: -10%;
  opacity: 0.4;
}

.band-1 {
  top: 15%;
  background: linear-gradient(90deg, #e8d4b0, #d4b890, #e8d4b0);
  transform: rotate(-2deg);
}

.band-2 {
  top: 35%;
  background: linear-gradient(90deg, #c19870, #a87c50, #c19870);
  transform: rotate(1deg);
}

.band-3 {
  top: 55%;
  background: linear-gradient(90deg, #d4a87a, #b88c5a, #d4a87a);
  transform: rotate(-1deg);
}

.band-4 {
  top: 75%;
  background: linear-gradient(90deg, #a87050, #8c5840, #a87050);
  transform: rotate(2deg);
}

.great-red-spot {
  position: absolute;
  width: 35px;
  height: 28px;
  background: radial-gradient(ellipse, #d45a4a, #b84838);
  border-radius: 50%;
  top: 45%;
  left: 40%;
  opacity: 0.8;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3);
}

/* Mars polar caps */
.mars-polar-cap {
  position: absolute;
  background: radial-gradient(circle, #ffffff 30%, #f0f0f0 60%, transparent 100%);
  border-radius: 50%;
  opacity: 0.85;
}

.mars-north {
  width: 22px;
  height: 22px;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
}

.mars-south {
  width: 26px;
  height: 26px;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
}

/* Neptune storm */
.neptune-spot {
  position: absolute;
  width: 25px;
  height: 20px;
  background: radial-gradient(ellipse, #2a4a8a, #1a3a6a);
  border-radius: 50%;
  top: 40%;
  left: 35%;
  opacity: 0.7;
}

/* Uranus bands */
.uranus-bands {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, 
      transparent 20%, 
      rgba(255,255,255,0.1) 22%, 
      transparent 24%,
      transparent 45%,
      rgba(255,255,255,0.1) 47%,
      transparent 49%,
      transparent 70%,
      rgba(255,255,255,0.1) 72%,
      transparent 74%
    );
}

/* Container for the ring system to handle the 3D tilt without black overlays */
.saturn-ring-system, .uranus-ring-system {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(75deg) rotateY(-10deg);
  pointer-events: none;
  z-index: 1; 
}

/* Uranus rings are tilted differently */
.uranus-ring-system {
  transform: translate(-50%, -50%) rotateX(85deg) rotateZ(90deg);
}

/* Base style for all rings - using borders to keep the center transparent */
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: transparent; 
}

.outer-ring {
  width: 210px;
  height: 210px;
  border: 8px solid rgba(200, 180, 150, 0.3);
}

.middle-ring {
  width: 185px;
  height: 185px;
  border: 12px solid rgba(220, 200, 170, 0.6);
}

.inner-ring {
  width: 145px;
  height: 145px;
  border: 4px solid rgba(160, 140, 110, 0.4);
}

.ring-thin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border: 2px solid rgba(150, 200, 255, 0.4);
  border-radius: 50%;
}

.planet-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.planet-title h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
}

.planet-title .planet-type,
.planet-title .planet-color {
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: #9aa4ff;
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.3);
}

.planet-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
}

.map-btn, .like-btn, .rating-box {
  width: 250px;
  box-sizing: border-box;
}

.map-btn, .like-btn {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
  text-align: center;
}

.map-btn {
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
}

.like-btn {
  background: linear-gradient(135deg, #ffda6b, #ffc75f);
  color: #222;
}

.map-btn:hover, .like-btn:hover {
  transform: scale(1.05);
}

.rating-box {
  background-color: rgba(0,0,50,0.8);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 12px rgba(125, 95, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.rating-success {
  margin-top: 8px;
  font-size: 0.85rem;
  color: rgba(125, 95, 255, 0.85);
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.4);
}

.rate-label {
  color: rgba(125, 95, 255, 0.3);
  font-weight: 600;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
  margin-bottom: 0.25rem;
}

.rate-stars {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.2rem;
}

.rate-stars .star {
  color: rgba(125, 95, 255, 0.3);
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.5);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.rate-stars .star.filled {
  color: rgba(125, 95, 255, 1);
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.8);
}

.rate-stars .star:hover {
  transform: scale(1.2);
}

.send-rating-btn {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #9aa4ff, #7f7fff);
  color: #fff;
  transition: transform 0.2s ease;
}

.send-rating-btn:hover {
  transform: scale(1.05);
}

.planet-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: rgba(0,0,30,0.8);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-card .label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #9aa4ff;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
}

.info-card .value {
  font-weight: 500;
  font-size: 1.1rem;
  color: #fff;
  text-align: right;
}

.owner-info {
  background-color: rgba(0,0,30,0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
}

.owner-info h2 {
  margin-top: 0;
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.owner-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.owner-info p strong {
  font-weight: 600;
  color: #9aa4ff; 
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
}
</style>