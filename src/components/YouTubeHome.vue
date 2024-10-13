<template>
    <div class="home-container">
        <h1 class="text-3xl font-bold text-center mt-10">Welcome to Minimify - YouTube!</h1>
        <div v-if="loading" class="text-center">Loading your YouTube data...</div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

        <div v-if="videos.length">
            <input type="text" v-model="searchQuery" @input="searchVideos" class="search-input"
                placeholder="Search for videos..." />
            <ul class="video-list">
                <li v-for="video in videos" :key="video.id.videoId" class="video-item">
                    <h2>{{ video.snippet.title }}</h2>
                    <img :src="video.snippet.thumbnails.default.url" alt="Video thumbnail" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

export default defineComponent({
    name: 'YouTubeHome',
    setup() {
        const loading = ref(true);
        const error = ref('');
        const searchQuery = ref('');
        const videos = ref<Video[]>([]);

        const searchVideos = async () => {
            if (searchQuery.value.trim() === '') {
                videos.value = [];
                return;
            }
            const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube API Key
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: searchQuery.value,
                        key: apiKey,
                    },
                });
                videos.value = response.data.items;
            } catch (err) {
                error.value = 'Failed to fetch videos';
            } finally {
                loading.value = false;
            }
        };

        return {
            loading,
            error,
            searchQuery,
            videos,
            searchVideos,
        };
    },
});
</script>

<style scoped>
.home-container {
    background: #000;
    color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.text-red-500 {
    color: #ff5555;
}

.search-input {
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    background: #1c1c1c;
    color: #fff;
}

.video-list {
    list-style: none;
    padding: 0;
    width: 100%;
}

.video-item {
    margin: 10px 0;
    padding: 10px;
    background: #1c1c1c;
    border-radius: 5px;
    cursor: pointer;
}
</style>
