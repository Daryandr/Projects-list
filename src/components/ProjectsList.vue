<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const store = useProjectsStore()
const { projects, count, title, status, page } = storeToRefs(store)
const isLoading = ref(false)

async function fetchProjects(p) {
  page.value = p
  isLoading.value = true
  await store.fetchProjects()
  isLoading.value = false
}

onMounted(() => {
  fetchProjects(1)
})
</script>

<template>
  <div class="container mx-auto px-20 text-center">
    <input
      v-model="title"
      placeholder="Введите название..."
      class="p-2 me-2 border rounded focus:outline-none focus:border-primary"
    />
    <button @click="fetchProjects(1)" class="bg-gray-400 p-3 rounded hover:bg-gray-500">
      <svg
        style="color: white"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          fill="white"
        />
      </svg>
    </button>
    <br />
    <select
      v-model="status"
      @change="fetchProjects(1)"
      class="p-1 my-2 border rounded focus:outline-none focus:border-primary"
    >
      <option value="">ALL</option>
      <option value="CREATED">CREATED</option>
      <option value="IN_PROGRESS">IN_PROGRESS</option>
      <option value="FINISHED">FINISHED</option>
    </select>
    <div v-if="isLoading" class="flex justify-center items-center my-3">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-500" />
    </div>
    <div v-else-if="projects.length === 0">Проекты не найдены</div>
    <ul v-else class="flex flex-col items-center">
      <li
        v-for="project in projects"
        :key="project.id"
        class="flex justify-between my-1 p-1 border rounded w-1/2"
      >
        <p>{{ project.title }}</p>
        <p>{{ project.status }}</p>
      </li>
    </ul>
    <div class="mt-4">
      <button
        @click="fetchProjects(--page)"
        :disabled="page === 1"
        class="p-2 me-2 bg-gray-400 text-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-auto disabled:hover:bg-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            fill="white"
          />
        </svg>
      </button>
      <button
        :disabled="page === Math.ceil(count / 10)"
        @click="fetchProjects(++page)"
        class="p-2 bg-gray-400 text-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-auto disabled:hover:bg-gray-400"
      >
        <svg
          style="color: white"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
