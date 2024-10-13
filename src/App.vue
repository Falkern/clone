<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* Global styles can be added here */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #121212;
  /* Set a default background */
  color: #ffffff;
  /* Default text color */
}
</style>