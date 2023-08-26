import { describe, it, expect, beforeEach } from 'vitest'
import {useProjectsStore} from "../../stores/projects";
import { setActivePinia, createPinia } from 'pinia'

describe('ProjectStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('fetchProjects adds projects', async () => {
        const store = useProjectsStore()
        await store.fetchProjects();
        expect(store.projects.length).toBeGreaterThan(0);
    })

    it('fetchProjects with title parameter filters correctly', async () => {
        const store = useProjectsStore()
        store.title = 'Рекламный'
        await store.fetchProjects()
        const allHaveTitle = store.projects.every(project => project.title.includes('Рекламный'))
        expect(allHaveTitle).toBe(true)
    })

    it('fetchProjects with status parameter filters correctly', async () => {
        const store = useProjectsStore()
        store.status = 'CREATED'
        await store.fetchProjects()
        const allHaveStatus = store.projects.every(project => project.status === 'CREATED')
        expect(allHaveStatus).toBe(true)
    })

    it('fetchProjects with page parameter gives different projects', async () => {
        const store = useProjectsStore()
        await store.fetchProjects()
        const initialProjects = store.projects
        store.page = 2
        await store.fetchProjects()
        const projectsChanged = store.projects.some((project, index) => project.id !== initialProjects[index].id)
        expect(projectsChanged).toBe(true)
    })
})