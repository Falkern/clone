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

        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (accessToken) {
            localStorage.setItem('spotifyAccessToken', accessToken);

            router.push({ name: 'Home' });
        } else {

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