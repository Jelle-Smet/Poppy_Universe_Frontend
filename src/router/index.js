import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home_Page.vue'; // renamed import for clarity

// define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  // you can add more routes here later
];

// create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
