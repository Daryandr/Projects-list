import {describe, it, expect, beforeEach} from 'vitest'

import { mount } from '@vue/test-utils'
import ProjectsList from '../ProjectsList.vue'
import { useProjectsStore } from '@/stores/projects'
import {createPinia, setActivePinia} from "pinia";

describe('ProjectsList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly when loading', async () => {
    const wrapper = mount(ProjectsList, {
      data() {
        return {
          store: useProjectsStore(),
          isLoading: true,
          projects: []
        }
      }
    })
    expect(wrapper.find('.animate-spin')).toBeDefined()
  })

  it('renders correctly when no projects are available', async () => {
    const wrapper = mount(ProjectsList, {
      data() {
        return {
          store: useProjectsStore(),
          isLoading: false,
          projects: [],
        }
      }
    })

    expect(wrapper.text()).toContain('Проекты не найдены')
  })
})
