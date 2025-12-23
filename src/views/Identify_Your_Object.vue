<template>
  <div class="arsenal-terminal-wrapper">
    <header class="terminal-header">
      <div class="cosmic-panel header-core">
        <div class="header-content">
          <div class="tech-bracket left">[</div>
          <h1 class="hero-title">HARDWARE <span class="pink-glow">ARSENAL</span></h1>
          <div class="tech-bracket right">]</div>
        </div>
        <p class="engine-tagline">POPPY UNIVERSE // MODULE: OPTICAL_MANIFEST_V.2</p>
      </div>
    </header>

    <div class="terminal-layout">
      <aside class="hud-pane">
        <div class="hud-module">
          <div class="hud-inner">
            
            <div class="hud-system-info">
              <div class="status-group">
                <span class="pulse-dot"></span>
                <span class="tech-code">SYS_ACTIVE</span>
              </div>
              <span class="tech-code">REF_ID: {{ activeClass.toUpperCase() }}</span>
            </div>

            <div class="hud-visual-display">
              <div class="corner-accents">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
              </div>
              
              <div class="display-content">
                <div class="scanline"></div>
                <div class="target-reticle">
                  <div class="reticle-circle"></div>
                  <div class="reticle-cross"></div>
                </div>
                <div class="dynamic-label">
                  <p class="meta-label">CURRENT_GEAR</p>
                  <h2 class="cyan-text glow-text">{{ activeClassLabel }}</h2>
                </div>
              </div>

              <div class="hud-mini-telemetry">
                <div v-for="i in 5" :key="i" class="mini-bar-group">
                  <div class="mini-bar" :style="{ height: (20 + Math.random() * 80) + '%' }"></div>
                </div>
              </div>
            </div>

            <nav class="hud-nav">
              <button 
                v-for="step in hardwareClasses" 
                :key="step.anchor" 
                :class="['hud-nav-item', { active: activeClass === step.anchor }]"
                @click="scrollToStep(step.anchor)"
              >
                <span class="nav-id">{{ step.id }}</span>
                <span class="nav-text">{{ step.shortLabel }}</span>
              </button>
            </nav>

            <div class="hud-footer">
              <router-link to="/how-to-stargaze" class="tech-link">← INIT_RETURN_PROTOCOL</router-link>
            </div>
          </div>
        </div>
      </aside>

      <main class="content-pane custom-scrollbar" id="main-scroller">
        
        <section id="class1" class="cosmic-panel spec-block mission-trigger">
          <div class="spec-header">
            <span class="layer-dot l1"></span>
            <div class="spec-title-group">
              <span class="algo-tag">CLASS_00 // BIOLOGICAL</span>
              <h2>Biological <span class="pink-text">Optics</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">Pure-form photon detection using human sensory organs. Wide-field optimized for rapid constellation recognition and transient event monitoring.</p>
            <div class="troubleshoot-grid">
              <div class="guide-item">
                <h3 class="cyan-text">Naked Eye</h3>
                <p>FOV: 180°. Best for transient events: Meteor showers, ISS transits, and major planetary conjunctions.</p>
              </div>
              <div class="guide-item">
                <h3 class="cyan-text">Binoculars</h3>
                <p>Ideal for sweeping the Milky Way core. Provides a natural 3D-like perspective of the lunar surface.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="class2" class="cosmic-panel spec-block mission-trigger">
          <div class="spec-header">
            <span class="layer-dot l2"></span>
            <div class="spec-title-group">
              <span class="algo-tag">CLASS_01 // LENS_BASED</span>
              <h2>Refractor <span class="pink-text">Core</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">High-contrast imaging utilizing high-transmission objective glass. Known for sharp details and zero maintenance requirements.</p>
            <div class="math-logic-box">
              <div class="logic-breakdown">
                <div class="step"><span class="tech-name">Primary</span><p>Convex Lens</p></div>
                <div class="operator">+</div>
                <div class="step"><span class="tech-name">Output</span><p>Sharp Planetary resolution</p></div>
              </div>
              <p class="api-note">*Optimal for Lunar Topography and Planetary Rings.*</p>
            </div>
          </div>
        </section>

        <section id="class3" class="cosmic-panel spec-block mission-trigger">
          <div class="spec-header">
            <span class="layer-dot l3"></span>
            <div class="spec-title-group">
              <span class="algo-tag">CLASS_02 // MIRROR_BASED</span>
              <h2>Reflector <span class="pink-text">Core</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">Maximum light-gathering efficiency per aperture. Parabolic mirrors eliminate chromatic aberration, optimized for deep-sky objects.</p>
            <div class="math-logic-box">
              <div class="logic-breakdown">
                <div class="step"><span class="tech-name">Aperture</span><p>8"+ Diameter</p></div>
                <div class="operator">=</div>
                <div class="step"><span class="tech-name">Reach</span><p>Faint DSO Detection</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="class4" class="cosmic-panel spec-block mission-trigger">
          <div class="spec-header">
            <span class="layer-dot l4"></span>
            <div class="spec-title-group">
              <span class="algo-tag">CLASS_03 // HYBRID</span>
              <h2>Catadioptric <span class="pink-text">System</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">Folded light paths combining lenses and mirrors. Offers the highest focal-length-to-portability ratio in the arsenal.</p>
            <div class="troubleshoot-grid">
              <div class="guide-item">
                <h3 class="cyan-text">SCT / Maksutov</h3>
                <p>Compact, powerful, and ideal for digital tracking. Requires thermal stabilization period.</p>
              </div>
              <div class="guide-item">
                <h3 class="cyan-text">Use Case</h3>
                <p>Advanced planetary tracking and Deep Sky astrophotography.</p>
              </div>
            </div>
          </div>
        </section>

        <footer class="manifest-footer">
          <router-link to="/stargazing-forecast" class="manifest-btn">CALIBRATE TO LIVE TELEMETRY</router-link>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const activeClass = ref('class1');
const hardwareClasses = [
    { id: 'C_00', label: 'BIOLOGICAL', shortLabel: 'OPTICS', anchor: 'class1' },
    { id: 'C_01', label: 'REFRACTOR',  shortLabel: 'LENS_CORE', anchor: 'class2' },
    { id: 'C_02', label: 'REFLECTOR',  shortLabel: 'MIRROR_CORE', anchor: 'class3' },
    { id: 'C_03', label: 'HYBRID',     shortLabel: 'SCT_MAK', anchor: 'class4' }
];

const activeClassLabel = computed(() => {
  return hardwareClasses.find(s => s.anchor === activeClass.value)?.label || 'CLASS_00';
});

let observer = null;

const scrollToStep = (id) => {
    const container = document.getElementById('main-scroller');
    const el = document.getElementById(id);
    if (el && container) {
        container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
};

onMounted(() => {
    document.body.style.overflow = 'hidden';
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) activeClass.value = entry.target.id;
        });
    }, { root: document.getElementById('main-scroller'), threshold: 0.6 });

    document.querySelectorAll('.mission-trigger').forEach(el => observer.observe(el));
});

onUnmounted(() => {
    document.body.style.overflow = '';
    observer?.disconnect();
});
</script>

<style scoped>
.arsenal-terminal-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #030010;
  color: #e6e6fa;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* 1. HEADER SECTION */
.terminal-header { flex: 0 0 auto; padding: 25px 40px 15px; }
.header-core { text-align: center; padding: 20px !important; background: rgba(125, 95, 255, 0.05) !important; border-width: 0 0 1px 0 !important; border-radius: 0 !important; }
.header-content { display: flex; justify-content: center; align-items: center; gap: 20px; }
.hero-title { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; margin: 0; }
.pink-glow { color: #ff69b4; text-shadow: 0 0 15px #ff007f; }
.tech-bracket { color: #00ffff; font-size: 2rem; font-weight: 300; opacity: 0.5; }
.engine-tagline { font-size: 0.75rem; color: #00ffff; letter-spacing: 5px; margin-top: 10px; opacity: 0.8; }

/* 2. LAYOUT GRID */
.terminal-layout { display: flex; flex: 1; padding: 0 40px 40px; gap: 30px; min-height: 0; }

/* HUD PANE (LEFT) */
.hud-pane { flex: 0 0 360px; height: 100%; }
.hud-module { height: 100%; background: rgba(0, 255, 255, 0.02); border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 12px; padding: 10px; }
.hud-inner { height: 100%; display: flex; flex-direction: column; gap: 15px; border: 1px solid rgba(0, 255, 255, 0.1); border-radius: 8px; padding: 20px; }

.hud-system-info { display: flex; justify-content: space-between; font-size: 0.65rem; color: #00ffff; font-family: monospace; }
.status-group { display: flex; align-items: center; gap: 6px; }
.pulse-dot { width: 6px; height: 6px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 10px #00ff00; animation: pulse 2s infinite; }

.hud-visual-display { flex: 1; background: rgba(0,0,0,0.5); border: 1px solid rgba(0, 255, 255, 0.1); border-radius: 6px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.corner { position: absolute; width: 10px; height: 10px; border: 2px solid #00ffff; }
.top-left { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
.top-right { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
.bottom-left { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
.bottom-right { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

.scanline { position: absolute; top: 0; left: 0; width: 100%; height: 50px; background: linear-gradient(to bottom, rgba(0,255,255,0.1), transparent); animation: scan 4s linear infinite; }
@keyframes scan { from { top: -50px; } to { top: 100%; } }

.active-readout { text-align: center; }
.meta-label { font-size: 0.6rem; color: #00ffff; letter-spacing: 2px; opacity: 0.6; }
.glow-text { font-size: 1.5rem; text-shadow: 0 0 10px #00ffff; letter-spacing: 3px; }

.hud-mini-telemetry { position: absolute; bottom: 15px; left: 20px; right: 20px; height: 30px; display: flex; gap: 4px; align-items: flex-end; }
.mini-bar { flex: 1; background: #ff69b4; opacity: 0.4; transition: height 0.5s ease; }

/* HUD NAV */
.hud-nav { display: flex; flex-direction: column; gap: 8px; }
.hud-nav-item { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px; border-radius: 4px; display: flex; justify-content: space-between; cursor: pointer; transition: 0.3s; font-size: 0.7rem; font-weight: 800; font-family: 'Inter', sans-serif; }
.hud-nav-item.active { background: rgba(255, 105, 180, 0.1); border-color: #ff69b4; color: #ff69b4; }
.nav-id { opacity: 0.5; }

.hud-footer { margin-top: auto; padding-top: 10px; }
.tech-link { font-size: 0.7rem; color: #00ffff; text-decoration: none; opacity: 0.6; font-weight: bold; }
.tech-link:hover { opacity: 1; }

/* 3. CONTENT PANE (RIGHT) */
.content-pane { flex: 1; overflow-y: auto; scroll-behavior: smooth; padding-right: 15px; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #ff69b4; border-radius: 10px; }

.spec-block { margin-bottom: 30px; background: rgba(10, 0, 50, 0.4) !important; padding: 40px !important; border-radius: 20px !important; border: 1px solid rgba(0, 255, 255, 0.2) !important; }
.spec-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px; }
.spec-title-group h2 { font-size: 1.8rem; margin: 5px 0 0; color: #00ffff; }

.engine-description { color: #e6e6fa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px; padding-left: 20px; border-left: 2px solid #ff69b4; }

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.guide-item { padding: 20px; border: 1px dashed rgba(0, 255, 255, 0.2); border-radius: 12px; background: rgba(0,0,0,0.2); }
.guide-item h3 { font-size: 1rem; margin-bottom: 10px; }

.math-logic-box { background: rgba(0,0,0,0.3); padding: 25px; border-radius: 12px; border: 1px solid rgba(0,255,255,0.1); margin-top: 25px; }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; }

/* UTILS */
.layer-dot { width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }
.l1 { color: #00ff00; background: #00ff00; } .l2 { color: #00ffff; background: #00ffff; } .l3 { color: #ff69b4; background: #ff69b4; } .l4 { color: #ffff00; background: #ffff00; }
.algo-tag { color: #ff69b4; font-weight: 800; font-size: 0.7rem; }

.manifest-footer { padding: 40px 0; text-align: center; }
.manifest-btn { display: inline-block; padding: 18px 50px; background: #ff69b4; color: #fff; text-decoration: none; font-weight: 900; border-radius: 50px; box-shadow: 0 0 30px rgba(255, 105, 180, 0.3); transition: 0.3s; }
.manifest-btn:hover { transform: scale(1.05); box-shadow: 0 0 50px rgba(255, 105, 180, 0.5); }

@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }
</style>