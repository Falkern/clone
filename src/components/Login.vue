<template>
    <div id="app" class="flex items-center justify-center min-h-screen bg-black">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-2xl font-bold text-center text-black mb-6">Log in to Minimify</h1>
            <div class="my-6 border-t border-gray-300"></div>
            <div class="space-y-4">
                <button @click="loginWithSpotify" class="w-full bg-black text-white py-2 rounded-full font-bold">
                    Log In with Spotify
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            showPassword: false as boolean,
        };
    },
    methods: {
        loginWithSpotify() {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const redirectUri = 'http://localhost:8080/callback';

            if (!clientId) {
                console.error('Spotify Client ID is not defined in the environment variables.');
                return;
            }

            const scopes = [
                'user-read-private',
                'user-read-email',
                'user-library-read',
                'playlist-read-private',
                'streaming',
            ].join(' ');

            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
                redirectUri
            )}&scope=${encodeURIComponent(scopes)}`;

            window.location.href = url;
        }
    }
});
</script>

<style scoped>
body {
    background: #1db954;
    font-family: 'Poppins', sans-serif;
}
</style>
