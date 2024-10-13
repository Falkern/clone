import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../components/Login.vue';
import Callback from '../components/Callback.vue';
import SpotifyHome from '../components/SpotifyHome.vue'; // Import SpotifyHome
import YouTubeHome from '../components/YouTubeHome.vue'; // Import YouTubeHome

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Login', component: Login },
  { path: '/callback', name: 'Callback', component: Callback },
  { path: '/spotify-home', name: 'SpotifyHome', component: SpotifyHome, meta: { requiresAuth: true } },
  { path: '/youtube-home', name: 'YouTubeHome', component: YouTubeHome, meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirect all undefined routes to the login
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Function to check if the user is authenticated
function isAuthenticated(): boolean {
  return !!localStorage.getItem('spotifyAccessToken') || !!localStorage.getItem('youtubeAccessToken');
}

// Navigation guard to protect routes that require authentication
router.beforeEach((to, _from, next) => {
  console.log('Navigating to:', to.name);
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    console.log('User is not authenticated, redirecting to Login');
    next({ name: 'Login' });
  } else {
    console.log('User is authenticated or route does not require auth');
    next();
  }
});

export default router;
