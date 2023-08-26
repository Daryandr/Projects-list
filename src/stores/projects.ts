import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import type {Project} from "@/types";

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const projectsCache = ref(new Map());
  const title = ref('');
  const status = ref('');
  const page = ref(1);
  const count = ref(0);
  async function fetchProjects() {
    let url = `${import.meta.env.VITE_SERVER_URL}?`
    if (title.value) {
      url += `title=${encodeURIComponent(title.value)}&`;
    }
    if (status.value) {
      url += `status=${encodeURIComponent(status.value)}&`;
    }
    if (page.value !== 1) {
      url += `page=${page.value}`;
    }
    if (projectsCache.value.has(url)) {
      projects.value = projectsCache.value.get(url).results;
      count.value = projectsCache.value.get(url).count;
      return;
    }
    try {
      const response = await axios.get(url);
      projectsCache.value.set(url, response.data);
      projects.value = response.data.results;
      count.value = response.data.count;
    } catch (error) {
      console.error(error);
    }
  }

  return { projects, count, title, status, page, fetchProjects }
})
