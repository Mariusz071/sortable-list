import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { createTestingPinia } from '@pinia/testing'

import { mockActions } from './mocks'

import { useSortableList } from '@/stores/sortableList'
import SortableListActions from '@/modules/SortableList/components/SortableListActions.vue'

describe('SortableListActions', () => {
  const wrapper = mount(SortableListActions, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false
        }),
        vuetify
      ]
    }
  })

  const listStore = useSortableList()

  describe('renders correctly', () => {
    it('WHEN there is no commited actions yet', () => {
      expect(wrapper.findAllComponents({ name: 'VCard' }).length).toBe(2)
      expect(wrapper.findAllComponents({ name: 'VCardText' }).length).toBe(2)
      expect(wrapper.findComponent({ name: 'VCardTitle' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VTable' }).exists()).toBe(false)
      expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(false)

      const placeholder = wrapper.find('[test-id="no-actions-placeholder"]')
      expect(placeholder.exists()).toBe(true)
      const expectedText = "There's no commited actions."
      expect(placeholder.text()).toBe(expectedText)
    })

    it('WHEN there are 5 actions commited', async () => {
      listStore.postActions = mockActions
      await wrapper.vm.$nextTick()

      expect(wrapper.findAllComponents({ name: 'VCard' }).length).toBe(2)
      expect(wrapper.findAllComponents({ name: 'VCardText' }).length).toBe(1)
      expect(wrapper.findComponent({ name: 'VCardTitle' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VTable' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(true)

      expect(wrapper.find('[test-id="no-actions-placeholder"]').exists()).toBe(false)
      const actionsComponents = wrapper.findAllComponents({ name: 'SortableListActionsAction' })
      expect(actionsComponents.length).toBe(5)
    })
  })
})
