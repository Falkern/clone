<template>
    <div id="app" class="flex items-center justify-center min-h-screen bg-black">
        <div class="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-3xl font-bold text-center text-white mb-6">Log in to Minimify</h1>
            <div class="my-6 border-t border-gray-700"></div>
            <div class="space-y-4">
                <button @click="loginWithSpotify"
                    class="w-full bg-green-500 text-white py-3 rounded-full font-bold transition duration-300 hover:bg-green-600"
                    :disabled="isLoading">
                    <span v-if="isLoading">Logging In...</span>
                    <span v-else>Log In with Spotify</span>
                </button>
                <button @click="loginWithYouTube"
                    class="w-full bg-red-500 text-white py-3 rounded-full font-bold transition duration-300 hover:bg-red-600"
                    :disabled="isLoading">
                    <span v-if="isLoading">Logging In...</span>
                    <span v-else>Log In with YouTube</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const isLoading = ref(false);

        const loginWithSpotify = async () => {
            isLoading.value = true; // Set loading state
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:5173/spotify-home';

            if (!clientId) {
                console.error('Spotify Client ID is not defined in the environment variables.');
                isLoading.value = false; // Reset loading state
                return;
            }

            const scopes = [
                'user-read-private',
                'user-read-email',
                'user-library-read',
                'playlist-read-private',
                'streaming',
            ].join(' ');

            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

            window.location.href = url; // Redirect to Spotify login
        };

        const loginWithYouTube = () => {
            isLoading.value = true; // Set loading state
            const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID;
            const redirectUri = import.meta.env.VITE_YOUTUBE_REDIRECT_URI || 'http://localhost:5173/callback';

            if (!clientId) {
                console.error('YouTube Client ID is not defined in the environment variables.');
                isLoading.value = false; // Reset loading state
                return;
            }

            const scopes = [
                'https://www.googleapis.com/auth/youtube.readonly',
                'https://www.googleapis.com/auth/youtube.force-ssl',
            ].join(' ');

            const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scopes)}`;

            window.location.href = url; // Redirect to YouTube login
        };

        return {
            isLoading,
            loginWithSpotify,
            loginWithYouTube,
        };
    },
});
</script>

<style scoped>
body {
    background: #1a1a1a;
    /* Dark background for the app */
    font-family: 'Poppins', sans-serif;
}

h1 {
    font-family: 'Poppins', sans-serif;
}

/* Button hover effects */
button {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

button:hover {
    transform: translateY(-2px);
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
