<template>
  <div class="poppy-universe-status"> 
    <header class="status-header">
      <h1 :class="['hero-title', { 'loaded': isLoaded }]">
        <span class="universe-highlight">System Status</span> ⚙️
      </h1>
      <p class="hero-subtitle">
        Real-time diagnostic health check for the Poppy Universe stack.
      </p>

      <div class="status-meta">
        <p class="last-checked">
            Last Checked: <span class="meta-value">{{ lastChecked || 'N/A' }}</span>
        </p>
        <p class="backend-url-note">
            Target Endpoint: <span class="url-glow">{{ BACKEND_URL }}</span>
        </p>
      </div>

      <button class="cta-button refresh-button" @click="checkBackendStatus" :disabled="!lastChecked">
        Refresh Status 🔄
      </button>
    </header>

    <main class="content-section">
      <section class="tech-stack cosmic-panel full-width">
        <h2>💻 Core Component Health</h2>
        <p class="panel-intro">
            Status is determined by a fast, non-destructive health check (SELECT 1+1) performed by the Node.js backend.
        </p>
        <ul class="tech-list">
            <li v-for="tech in techStack" :key="tech.key">
                <span class="tech-name">{{ tech.name }}</span>
                <span class="tech-detail">{{ tech.detail }}</span>
                <span :class="['tech-status', getStatusClass(tech.status)]">{{ tech.status }}</span>
            </li>
        </ul>
      </section>

      <section class="troubleshooting cosmic-panel full-width">
        <h2>🛠️ Troubleshooting & Usage</h2>
        <div class="troubleshoot-grid">
            <div class="guide-item">
                <h3>Backend Offline (❌)</h3>
                <p>
                    **Symptom:** Both Backend and Database show Offline.
                    <br>
                    **Action:** The Express server is not responding. Check your terminal for Node.js process status and ensure the application is running on port 5000.
                </p>
            </div>
            <div class="guide-item">
                <h3>Database Offline (❌)</h3>
                <p>
                    **Symptom:** Backend is Online (✅), but Database is Offline (❌).
                    <br>
                    **Action:** The Node server is running but cannot connect to MySQL. Check MySQL credentials, host/port (`.env` file), and ensure the MySQL service is started.
                </p>
            </div>
        </div>
        <p class="api-note">
            *For development purposes, the Backend is considered `Online` if it returns an HTTP 200 OK, even if the Database is down.*
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    // The URL for the status check. Adjust this if your actual API endpoint is different.
    const BACKEND_URL = 'http://localhost:5000/status'; 

    const isLoaded = ref(false);
    const lastChecked = ref(null);

    // State for the tech stack details
    const techStack = ref([
        { name: 'Frontend', detail: 'Vue 3 Composition API', status: 'Active 🟢', key: 'frontend' },
        { name: 'Backend', detail: 'Node.js & Express', status: 'Checking... 🔄', key: 'backend' },
        { name: 'Database', detail: 'MySQL/Poppy_Universe', status: 'Checking... 🔄', key: 'database' },
        { name: 'Authentication', detail: 'JWT & bcrypt', status: 'Active 🟢', key: 'auth' },
    ]);

    // Function to check the backend status and parse the complex response
    const checkBackendStatus = async () => {
        const backendItem = techStack.value.find(tech => tech.key === 'backend');
        const databaseItem = techStack.value.find(tech => tech.key === 'database');
        if (!backendItem || !databaseItem) return;

        // Reset statuses to indicate a fresh check
        backendItem.status = 'Checking... 🔄';
        databaseItem.status = 'Checking... 🔄';

        try {
            // Set a 5-second timeout for the request
            const response = await fetch(BACKEND_URL, { signal: AbortSignal.timeout(5000) }); 
            
            if (response.ok) {
                const data = await response.json(); 
                
                // Backend status update
                backendItem.status = (data.serviceStatus && data.serviceStatus === 'Online') ? 'Online ✅' : 'Online ✅';
                
                // Database status update
                if (data.databaseStatus === 'Online') {
                    databaseItem.status = 'Online ✅'; // Both active
                } else {
                    databaseItem.status = 'Offline ❌'; // Backend active, DB inactive
                }
                
            } else {
                // Server responded, but with an error status (e.g., 404, 500)
                backendItem.status = `Error ${response.status} 🔴`;
                databaseItem.status = `Error 🔴`; 
            }
        } catch (error) {
            // Network error, CORS issue, or timeout (Server is unreachable)
            console.error("System status check failed:", error);
            backendItem.status = 'Offline ❌';
            databaseItem.status = 'Offline ❌';
        } finally {
            // Update the last checked time regardless of success or failure
            lastChecked.value = new Date().toLocaleTimeString();
        }
    };

    onMounted(() => {
        // 1. Check System Status
        checkBackendStatus();

        // 2. Run the initial loading animation trigger
        setTimeout(() => {
            isLoaded.value = true;
        }, 50);
    });

    // Helper function to map status text to CSS class
    function getStatusClass(status) {
        if (status.includes('Online') || status.includes('Active')) {
            return 'status-active';
        } else if (status.includes('Offline') || status.includes('Error')) {
            return 'status-error';
        } else if (status.includes('Ready') || status.includes('Checking')) {
            return 'status-ready';
        }
        return ''; // Default class
    }
</script>

<style scoped>
/*
|--------------------------------------------------------------------------
| Global Status Container & Hero Styling
|--------------------------------------------------------------------------
*/
.poppy-universe-status {
    padding: 20px; 
    color: #e6e6fa; 
    font-family: 'Inter', sans-serif;
    padding-bottom: 80px;
    min-height: 100vh;
}

.status-header { 
    text-align: center;
    padding: 50px 20px 40px; 
    margin-bottom: 30px; /* Reduced margin */
}

.hero-title {
    font-size: 3.5rem; 
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
    font-size: 1.4rem;
    color: #a0f0ff; 
    margin-bottom: 20px;
    font-style: italic;
    font-weight: 300;
}

/* NEW: Meta info style */
.status-meta {
    margin-bottom: 25px;
    color: #e6e6fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}
.meta-value {
    font-weight: 700;
    color: #c0fcfc;
}
.backend-url-note {
    font-size: 1.0rem;
    color: #a0f0ff;
}
.url-glow {
    font-weight: 600;
    color: #c0fcfc;
    text-shadow: 0 0 5px #00ffff;
}
/* End NEW: Meta info style */


.cta-button.refresh-button {
    background: linear-gradient(45deg, #a0f0ff, #00ffff); 
    color: #0d002a;
    padding: 10px 25px;
    border: none;
    border-radius: 50px; 
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
    text-transform: uppercase;
    margin-top: 15px;
}
.cta-button.refresh-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}
.cta-button.refresh-button:hover {
    background: linear-gradient(45deg, #00ffff, #a0f0ff);
    transform: translateY(-2px) scale(1.03); 
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5);
}


/*
|--------------------------------------------------------------------------
| Content Sections (Cosmic Panels - Shared Styles)
|--------------------------------------------------------------------------
*/
.content-section {
    display: flex;
    flex-direction: column; /* Stack panels vertically */
    align-items: center;
    gap: 30px; 
    padding: 0 20px;
}

.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 35px;
    border-radius: 10px;
    border: 1px solid #ff69b4; 
    box-shadow: 0 0 15px rgba(255, 105, 180, 0.5); 
    max-width: 800px; 
    width: 100%;
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

.panel-intro {
    font-style: italic;
    color: #a0f0ff;
    margin-bottom: 20px;
    font-size: 0.95rem;
}

/*
|--------------------------------------------------------------------------
| Tech Stack Specific Styles (Detailed Layout)
|--------------------------------------------------------------------------
*/
.tech-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.tech-list li {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(138, 43, 226, 0.3);
    transition: background-color 0.2s;
}

.tech-list li:hover {
    background-color: rgba(106, 13, 173, 0.1);
}

.tech-name {
    font-weight: 700;
    color: #ff69b4; 
}

.tech-detail {
    font-style: italic;
    color: #e6e6fa;
    margin-left: 20px;
}

.tech-status {
    padding: 6px 12px;
    border-radius: 20px; 
    font-size: 0.85rem;
    font-weight: bold;
    text-align: center;
    min-width: 80px;
}

.status-active {
    background-color: rgba(0, 255, 0, 0.2);
    color: #00ff00;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.6); 
}

.status-ready {
    background-color: rgba(255, 255, 0, 0.15);
    color: #ffff00;
}

.status-error {
    background-color: rgba(255, 0, 0, 0.2);
    color: #ff0000;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.6); 
}

/*
|--------------------------------------------------------------------------
| NEW: Troubleshooting Styles
|--------------------------------------------------------------------------
*/
.troubleshoot-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 10px;
}

.guide-item {
    padding: 15px;
    border: 1px dashed rgba(106, 13, 173, 0.5);
    border-radius: 8px;
    background-color: rgba(106, 13, 173, 0.05);
}

.guide-item h3 {
    font-size: 1.2rem;
    color: #00ffff;
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: none;
    padding-bottom: 0;
}

.guide-item p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #e0ceff;
}
.api-note {
    margin-top: 20px;
    font-size: 0.85rem;
    color: #ffb6c1;
    text-align: center;
    border-top: 1px solid rgba(255, 105, 180, 0.2);
    padding-top: 15px;
}

@media (max-width: 768px) {
    .hero-title { font-size: 2.2rem; }
    .hero-subtitle { font-size: 1.1rem; }
    .tech-list li {
        grid-template-columns: 80px 1fr auto; 
    }
    .troubleshoot-grid {
        grid-template-columns: 1fr; /* Stack columns on small screens */
    }
}
</style>