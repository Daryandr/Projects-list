<script setup lang="ts">
import { useProjectsStore } from "@/stores/projects";
import {onMounted, computed} from "vue";

const store = useProjectsStore();
// const projects = store.projects;
const projects = computed(() => store.projects)

onMounted(() => {
  store.fetchProjects();
});
</script>

<template>
  <div>
    <p>
      {{ projects }}
    </p>
  </div>
</template>

<style scoped>

</style>
