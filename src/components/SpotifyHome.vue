<template>
    <div class="home-container">
        <h1 class="text-3xl font-bold text-center mt-10">Welcome to Minimify - Spotify!</h1>
        <div v-if="loading" class="text-center">Loading your Spotify data...</div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

        <div v-if="userData">
            <p>Hello, {{ userData.display_name }}!</p>
            <input type="text" v-model="searchQuery" @input="searchSongs" class="search-input"
                placeholder="Search for songs..." />
            <ul class="song-list">
                <li v-for="song in searchedSongs" :key="song.id" class="song-item" @click="playSong(song.uri)">
                    {{ song.name }} - {{ song.artists[0].name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface UserData {
    display_name: string;
}

interface Song {
    id: string;
    name: string;
    uri: string;
    artists: Array<{ name: string }>;
}

export default defineComponent({
    name: 'SpotifyHome',
    setup() {
        const loading = ref(true);
        const error = ref('');
        const userData = ref<UserData | null>(null);
        const searchQuery = ref('');
        const searchedSongs = ref<Song[]>([]);
        let player: any;

        onMounted(async () => {
            const accessToken = localStorage.getItem('spotifyAccessToken');
            if (accessToken) {
                await fetchUserData(accessToken);
                initializePlayer(accessToken);
            } else {
                error.value = 'Access token not found!';
                loading.value = false;
            }
        });

        const fetchUserData = async (token: string) => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                userData.value = response.data;
            } catch (err) {
                error.value = 'Failed to fetch user data';
            } finally {
                loading.value = false;
            }
        };

        const searchSongs = async () => {
            if (searchQuery.value.trim() === '') {
                searchedSongs.value = [];
                return;
            }
            const accessToken = localStorage.getItem('spotifyAccessToken');
            if (accessToken) {
                try {
                    const response = await axios.get('https://api.spotify.com/v1/search', {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        params: {
                            q: searchQuery.value,
                            type: 'track',
                        },
                    });
                    searchedSongs.value = response.data.tracks.items;
                } catch (err) {
                    error.value = 'Failed to search songs';
                }
            }
        };

        const initializePlayer = (token: string) => {
            player = new (window as any).Spotify.Player({
                name: 'Minimify Player',
                getOAuthToken: (cb: (token: string) => void) => { cb(token); },
                volume: 1,
            });

            player.connect().then((success: boolean) => {
                if (success) {
                    console.log('The Web Playback SDK is ready to play!');

                    player.on('ready', () => {
                        console.log('Player is ready!');
                    });

                    player.on('not_ready', (data: any) => {
                        console.error('Player is not ready', data);
                    });
                }
            });

            player.on('initialization_error', (e: any) => console.error(e));
            player.on('authentication_error', (e: any) => console.error(e));
            player.on('account_error', (e: any) => console.error(e));
            player.on('playback_error', (e: any) => console.error(e));
        };

        const playSong = (uri: string) => {
            if (player) {
                player.resume().then(() => {
                    player.play({
                        uris: [uri],
                    }).then(() => {
                        console.log(`Playing ${uri}`);
                    }).catch((error: any) => {
                        console.error('Error playing the song:', error);
                    });
                }).catch((error: any) => {
                    console.error('Error resuming the player:', error);
                });
            } else {
                console.error('Player not initialized');
            }
        };

        return {
            loading,
            error,
            userData,
            searchQuery,
            searchedSongs,
            searchSongs,
            playSong,
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

.song-list {
    list-style: none;
    padding: 0;
    width: 100%;
}

.song-item {
    margin: 10px 0;
    padding: 10px;
    background: #1c1c1c;
    border-radius: 5px;
    cursor: pointer;
}
</style>
