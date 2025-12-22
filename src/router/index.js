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
import Planet_Details from '../views/Planet_Details.vue';
import Moon_Details from '../views/Moon_Details.vue';
import Star_Encyclopedia from '../views/Encyclopedia_Star.vue';
import Planet_Encyclopedia from '../views/Encyclopedia_Planets.vue';
import Moon_Encyclopedia from '../views/Encyclopedia_Moons.vue';
import Liked_Objects from '../views/Liked_Objects.vue';
import Interacted_Objects from '../views/Interacted_Objects.vue';
import User_Settings from '../views/User_Settings.vue';
import Layer_1_Best_Right_Now from '../views/Layer_1_Best_Right_Now.vue';
import Calender_Component from '../components/Celestial_Calender.vue';
import Location_Component from '../components/Location_Component.vue';
import Layer_2_Trending_Community from '../views/Layer_2_Trending_Community.vue';

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
      },
      {
        path: '/planet/:id',   
        name: 'planet',
        component: Planet_Details,
        props: true           
      },
      {
        path: '/moon/:id',   
        name: 'moon',
        component: Moon_Details,
        props: true           
      },
      {
        path: '/Encyclopedia_stars',   
        name: 'Encyclopedia Planets',
        component: Star_Encyclopedia,
      },
      {
        path: '/Encyclopedia_Planets',   
        name: 'Encyclopedia planets',
        component: Planet_Encyclopedia,
      },
      {
        path: '/Encyclopedia_Moons',   
        name: 'Encyclopedia Moons',
        component: Moon_Encyclopedia,
      },
      {
        path: '/Liked_Objects',   
        name: 'liked Objects',
        component: Liked_Objects,
      },
      {
        path: '/Interacted_Objects',   
        name: 'interacted Objects',
        component: Interacted_Objects,
      },
      {
        path: '/User_Settings',   
        name: 'User Settings',
        component: User_Settings,
      },
      {
        path: '/Layer1_Recommendations',   
        name: 'Layer 1 Recommendations',
        component: Layer_1_Best_Right_Now,
        children: [
          {
            path: 'calendar', // Access via /Layer1_Recommendations/calendar
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', // Access via /Layer1_Recommendations/location
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/Layer2_Recommendations',   
        name: 'Layer 2 Recommendations',
        component: Layer_2_Trending_Community,
        children: [
          {
            path: 'calendar', // Access via /Layer1_Recommendations/calendar
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', // Access via /Layer1_Recommendations/location
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
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