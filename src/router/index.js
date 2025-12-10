// index.js (Router Configuration)
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home_Page.vue';
import MainLayout from '../components/Main_Layout.vue'; 
import Sign_Up_Log_In from '../views/Sign_Up_Log_In.vue';

// define your routes
const routes = [
  {
    path: '/',
    component: MainLayout, // This is the wrapper component (Navbar, Footer, and a hole for content)
    children: [ // The children array defines the content that goes into the <router-view /> of MainLayout
      {
        path: '', // An empty path makes this the default view for the parent path ('/')
        name: 'Home',
        component: HomePage, // This is the component that will be rendered inside MainLayout's <router-view />
      },
      {
        path: '/sign-up-login', // Define the route for the sign up / login page
        name: 'signUpLogin',
        component: Sign_Up_Log_In,
      },
    ],
  },
  // you can add more routes here later (e.g., path: 'about', component: AboutPage)
];

// create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;