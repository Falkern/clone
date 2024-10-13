import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Ensure you have this line
import './assets/styles.css'; // Adjust the path to your CSS file

createApp(App)
    .use(router) // Make sure the router is being used
    .mount('#app');
