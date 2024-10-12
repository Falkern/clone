<!-- src/components/Home.vue -->
<template>
    <div class="text-white">
        <h1 class="text-3xl font-bold text-center mt-10">Welcome to Minimify!</h1>
        <!-- Add your Spotify content display here -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Home',
    mounted() {
        const accessToken = localStorage.getItem('spotifyAccessToken');
        if (accessToken) {
        } else {
            console.error('Access token not found!');
        }
    },
});
</script>

<style scoped>
body {
    background: #121212;
    font-family: 'Poppins', sans-serif;
}
</style>