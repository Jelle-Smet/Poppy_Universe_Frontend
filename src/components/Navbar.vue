<template>
  <header>
    <nav class="navbar navbar-light bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand logo-container" href="#">
          <img src="../assets/images/Poppy_Universe_Logo.png" alt="Logo" class="logo" />
        </a>

        <div class="navbar-nav">
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'home' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('home')">
              Home
            </a>
            <ul v-if="selectedMenu === 'home'" class="dropdown-menu">
              <li>
                <router-link to="/" class="dropdown-item"> Home Page </router-link>
              </li>
              <li>
                <router-link to="/sign-up-login" class="dropdown-item">Sign Up / Login</router-link>
              </li>
              <li>
                <router-link to="/Latest_News" class="dropdown-item">Latest News</router-link>
              </li>
              <li>
                <router-link to="/System-Status" class="dropdown-item"> Status </router-link>
              </li>
              <li>
                <router-link to="/More" class="dropdown-item">More</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'account' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('account')">
              Account
            </a>
            <ul v-if="selectedMenu === 'account'" class="dropdown-menu">
              <li>
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
              </li>
               <li>
                <router-link to="/upcoming_bookings" class="dropdown-item">My Bookings</router-link>
              </li>
              <li>
                <router-link to="/past-cancelled-bookings" class="dropdown-item">My History</router-link>
              </li>
              <li>
                <router-link to="/spot/favorite" class="dropdown-item">My Favorites</router-link>
              </li>
              <li>
                <router-link to="/Notifications" class="dropdown-item">Notifications & Alerts</router-link>
              </li>
              <li>
                <router-link to="/settings" class="dropdown-item">Settings</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'encyclopedia' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('encyclopedia')">
              Encyclopedia 
            </a>
            <ul v-if="selectedMenu === 'encyclopedia'" class="dropdown-menu">
              <li>
                <router-link to="/Booking_Management" class="dropdown-item" > Stars</router-link>
              </li>
              <li>
                <router-link to="/spot-overview" class="dropdown-item">Planets</router-link>
              </li>
              <li>
                <router-link to= "/add-spot" class="dropdown-item"> Moons</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'objects' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('objects')">
              Objects
            </a>
            <ul v-if="selectedMenu === 'objects'" class="dropdown-menu">
              <li>
                <router-link to="/all-spots" class="dropdown-item">All Objects</router-link>
              </li>
              <li>
                <router-link to="/top-booked" class="dropdown-item">Popular Objects</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/categories">Categories</router-link>
              </li>
               <li>
                <router-link class="dropdown-item" to="/owner-spots">Owners</router-link>
              </li>
              <li>
                <router-link to="/Search-Spots" class="dropdown-item">Search Objects</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'exploration' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('exploration')">
              Exploration
            </a>
            <ul v-if="selectedMenu === 'exploration'" class="dropdown-menu">
              <li>
                <router-link to="/interactive-map" class="dropdown-item">Interactive Sky Map</router-link>
              </li>
              <li>
                <router-link to="/star-gazing-forecast" class="dropdown-item">Stargazing Forecast</router-link>
              </li>
            </ul>
          </li>
          
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'recommendations' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('recommendations')">
              Recommendations
            </a>
            <ul v-if="selectedMenu === 'recommendations'" class="dropdown-menu">
              <li>
                <router-link to="/all-recommendations" class="dropdown-item poppys-pick-highlight">Poppy's Pick</router-link>
              </li>
              <li>
                <router-link to="/personal-recommendations" class="dropdown-item">Activity Suggestions</router-link>
              </li>
              <li>
                <router-link to="/popular-by-users" class="dropdown-item">Community Populars</router-link>
              </li>
              <li>
                <router-link to="/matrix-factorization" class="dropdown-item">Category Deep Dive</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'poppys-guide' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('poppys-guide')">
              Poppy's Guide
            </a>
            <ul v-if="selectedMenu === 'poppys-guide'" class="dropdown-menu">
               <li>
                <router-link to="/Poppy's-Tips-&-Tricks" class="dropdown-item">Tips & Tricks for Explorers</router-link>
              </li>
              <li>
                <router-link to="/how-to-stargaze" class="dropdown-item">How to Stargaze</router-link>
              </li>
              <li>
                <router-link to="/equipment-basics" class="dropdown-item">Equipment Basics</router-link>
              </li>
              <li>
                <router-link to="/object-identification" class="dropdown-item">Identify Your Discovery</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'about-us' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('about-us')">
              About Us
            </a>
            <ul v-if="selectedMenu === 'about-us'" class="dropdown-menu">
              <li>
                <router-link to="/Our_Story" class="dropdown-item">Our Story</router-link>
              </li>
              <li>
                <router-link to="/Official-Partners" class="dropdown-item">Official Partners</router-link>
              </li>
              <li>
                <router-link to="/privacy-policy" class="dropdown-item">Privacy Policy</router-link>
              </li>
              <li>
                <router-link to="/terms-and-conditions" class="dropdown-item">Terms & Conditions</router-link>
              </li>
              <li>
                <router-link to="/Merchandise" class="dropdown-item">Merchandise</router-link>
                </li>
            </ul>
          </li>

          <li class="nav-item category">
            <router-link to="/Contact" class="nav-link">Contact</router-link>
          </li>
        </div>
        <a class="extra space" href="#">
        </a>
      </div>
    </nav>
  </header>

  <div class="content">
    </div>
</template>

---
<script>
export default {
  data() {
    return {
      selectedMenu: null, // Controls menu state via *click* (sticky open/close)
      hoverMenu: null,    // Controls menu state via *hover*
      // Added a small delay to close on mouseleave for better user experience
      closeTimer: null,
      CLOSE_DELAY: 150, // 150ms delay to allow mouse to move to the dropdown
    };
  },
  methods: {
    // 1. Toggles the menu state on click (your original click behavior)
    toggleSubMenu(menu) {
      // Clear any pending close actions
      clearTimeout(this.closeTimer);
      
      // If the same menu is clicked, close it. Otherwise, open the new menu and clear hover state.
      this.selectedMenu = this.selectedMenu === menu ? null : menu;
      this.hoverMenu = null; 
    },

    // 2. Opens menu on hover
    openSubMenu(menu) {
      // Clear any pending close actions
      clearTimeout(this.closeTimer);

      // Only open via hover if no menu is actively opened by click
      if (this.selectedMenu === null) {
        this.hoverMenu = menu;
      }
    },

    // 3. Closes menu when moving mouse away from the category block OR when a dropdown item is clicked
    closeSubMenu() {
      // Set a slight delay before closing to allow the mouse to move from the <li> title 
      // to the dropdown <ul> without closing the menu prematurely.
      clearTimeout(this.closeTimer);
      this.closeTimer = setTimeout(() => {
        // Only clear the hover state if the menu is NOT open via a click
        if (this.selectedMenu === null) {
          this.hoverMenu = null;
        }
        // Always clear the click state
        this.selectedMenu = null;
      }, this.CLOSE_DELAY);
    }
  },
};
</script>

<style scoped>
/* Navbar background color */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  /* RESTORED: width: auto; */
  width: auto;
  z-index: 999;
  background-color: #0b0c1a; /* Deep space navy */
  padding: 0px;
  border: 2px solid #7fdbff; /* Starry light blue */
  /* RESTORED: original border radius styles */
  border-radius: 5px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow:hidden;
  height: auto; /* RESTORED: Full height for the fixed sidebar */
}

/* Logo styling */
.navbar .logo-container {
  margin-right: 0px;
}

.navbar .logo {
  width: 150px;
  height: auto;
}

/* Categories listed vertically */
.navbar-nav {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

/* Styling for each category */
.navbar-nav .category {
  border: 2px solid #9b59b6; /* Purple nebula border */
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: auto;
}

/* Dropdown menu styling */
.nav-item .dropdown-menu {
  border: 1px solid #555; /* subtle cosmic glow */
  border-radius: 5px;
  overflow: hidden; 
}

/* Hover effect for standard dropdown items */
.nav-item .dropdown-menu .dropdown-item:hover {
  background-color: #1f1b3a; /* Dark purple galaxy */
  color: #f0f8ff !important; /* Light blue star text */
  border-color: #7fdbff; /* Starry border on hover */
}

/* Dark background and white text for the selected menu */
.nav-item.bg-dark .nav-link {
  background-color: #1f1b3a !important; /* matching galaxy hover */
  color: #f0f8ff !important;
}

/* Text color for navbar items */
.nav-item .nav-link {
  color: #c0c0ff !important; /* soft cosmic glow text */
}

/* Active state text color */
.nav-item.bg-dark .nav-link {
  color: #f0f8ff !important;
}

/* Dropdown items text color (Standard Items) */
.nav-item .dropdown-menu .dropdown-item {
  color: #dcdcff !important; /* faint starry text */
}

/* Apply hover effect for main categories */
.nav-item .nav-link:hover {
  background-color: #1f1b3a; /* Dark purple galaxy */
  color: #f0f8ff !important;
}


/* ------------------------------------------------------------------ */
/* --- START: New style for Poppy's Pick (FINAL ROBUST IMPLEMENTATION) --- */
/* 1. Style the parent list item (li) for the premium look */
.poppys-pick-highlight {
  /* Set a contrasting background for the entire row */
  background-color: #3b0e4a !important; /* Darker, distinct background */
  
  /* Add a premium border glow effect (using existing color) */
  border-left: 3px solid #ffc87c; /* Adds a visible golden line on the left */
  
  /* Ensure NO padding/margin on the LI itself to prevent overflow */
  margin: 0;
  padding: 0px; 
}

/* 2. Style the actual link inside the featured list item */
.poppys-pick-highlight .featured-link {
  /* CRITICAL: Make the link fill the LI container */
  display: block; 
  width: 100%;
  
  /* Inherit standard dropdown padding for alignment */
  padding: 8px 15px; 
  
  /* Text styling */
  color: #ffc87c !important; /* Bright, glowing golden color */
  font-weight: 700 !important; /* Ensure it's bold */
  text-shadow: 0 0 3px rgba(255, 200, 124, 0.4); /* Subtle glow */
  text-decoration: none; /* Remove underline */
}

/* 3. Style the hover effect on the entire featured item */
.poppys-pick-highlight:hover {
  background-color: #4a0f60 !important; /* Even darker on hover */
  border-left: 5px solid #ffc87c; /* Thicker left border on hover */
}

/* 4. Ensure the text color stays bright on hover */
.poppys-pick-highlight:hover .featured-link {
  color: #ffffff !important; 
}
/* --- END: New style for Poppy's Pick --- */
</style>