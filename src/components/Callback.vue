<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <div class="text-center text-white">
            <p>Logging you in...</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Callback',
    setup() {
        const router = useRouter();

        // Extract the access token from the URL fragment
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const spotifyAccessToken = params.get('access_token');
        const youtubeAccessToken = params.get('access_token'); // YouTube access token is retrieved the same way

        // Check which service is being used based on the URL or some other condition
        // const isSpotifyLogin = window.location.href.includes('spotify'); // Adjust this condition as needed
        // const isYouTubeLogin = window.location.href.includes('youtube'); // Adjust this condition as needed

        if (spotifyAccessToken) {
            localStorage.setItem('spotifyAccessToken', spotifyAccessToken);
            console.log('Spotify access token stored in localStorage');
            // Redirect to SpotifyHome.vue
            router.push({ name: 'SpotifyHome' });
        } else if (youtubeAccessToken) {
            localStorage.setItem('youtubeAccessToken', youtubeAccessToken);
            console.log('YouTube access token stored in localStorage');
            // Redirect to YouTubeHome.vue
            router.push({ name: 'YouTubeHome' });
        } else {
            console.error('No access token found for either service');
            // Handle the error case accordingly, maybe redirect to login
            router.push({ name: 'Login' });
        }
    },
});
</script>

<style scoped>
body {
    background: #1db954;
    font-family: 'Poppins', sans-serif;
}
</style>
