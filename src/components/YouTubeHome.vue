<template>
    <div class="home-container">
        <h1 class="text-3xl font-bold text-center mt-10">Welcome to Minimify - YouTube Music!</h1>
        <div v-if="loading" class="text-center">Loading your YouTube data...</div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

        <div v-if="videos.length">
            <input type="text" v-model="searchQuery" @input="debouncedSearch" class="search-input"
                placeholder="Search for music videos..." :disabled="loading" />
            <ul class="video-list">
                <li v-for="video in videos" :key="video.id.videoId" class="video-item"
                    @click="playVideo(video.id.videoId)">
                    <h2>{{ video.snippet.title }}</h2>
                    <img :src="video.snippet.thumbnails.high.url" alt="Video thumbnail" />
                </li>
            </ul>
        </div>

        <div v-if="selectedVideoId" class="video-player">
            <iframe width="100%" height="315" :src="'https://www.youtube.com/embed/' + selectedVideoId + '?autoplay=1'"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            high: {
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
        const selectedVideoId = ref<string | null>(null);
        const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

        const searchVideos = async () => {
            if (searchQuery.value.trim() === '') {
                videos.value = [];
                return;
            }
            const apiKey = process.env.VITE_YOUTUBE_API_KEY; // Access the API key from environment variables
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: searchQuery.value + ' music',
                        type: 'video',
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

        const playVideo = (videoId: string) => {
            selectedVideoId.value = videoId;
        };

        const debouncedSearch = () => {
            if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
            debounceTimeout.value = setTimeout(searchVideos, 300);
        };

        watch(searchQuery, (newQuery) => {
            if (!newQuery) {
                videos.value = [];
            }
        });

        return {
            loading,
            error,
            searchQuery,
            videos,
            selectedVideoId,
            playVideo,
            debouncedSearch,
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
    transition: background 0.3s;
}

.video-item:hover {
    background: #333;
}

.video-player {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
