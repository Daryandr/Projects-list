import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  async function fetchProjects() {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_URL);
      projects.value = response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  return { projects, fetchProjects }
})
