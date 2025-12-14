// index.js (Router Configuration)
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home_Page.vue';
import MainLayout from '../components/Main_Layout.vue'; 
import Sign_Up_Log_In from '../views/Sign_Up_Log_In.vue';
import Latest_News from '../views/Latest_News.vue'; // import the LatestNews Component
import Status_Check from '../views/Status_Check.vue';
import Profile_Page from '../views/Profile_Page.vue';
import My_Stars from '../views/My_Stars.vue';
import Star_Details from '../views/Star_Details.vue';

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
      {
        path: '/Latest_News',
        name: "Latest News",
        component: Latest_News
      },
      {
        path: '/System-Status',
        name: "Status",
        component: Status_Check
      },
      {
        path: '/Profile_Page',
        name: "Profile Page",
        component: Profile_Page
      },
      {
        path: '/My_Stars',
        name: "My Stars",
        component: My_Stars
      },
      {
        path: '/star/:id',   
        name: 'Star',
        component: Star_Details,
        props: true           
      }

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