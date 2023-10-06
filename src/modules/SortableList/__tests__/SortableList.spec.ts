import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'

import SortableList from '../SortableList.vue'

describe('SortableList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SortableList, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  describe('renders properly', () => {
    it('WHEN on lgAndUp Vuetify breakpoint', async () => {
      wrapper.vm.lgAndUp = true
      wrapper.vm.mdAndDown = false

      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent({ name: 'ListItems' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'ListActions' }).exists()).toBe(true)

      // checks for layout positioning
      expect(wrapper.find('[test-id="sortable-list-wrapper"].flex-column').exists()).toBe(false)
      expect(wrapper.find('[test-id="list-items-col"].mr-12').exists()).toBe(true)
      expect(wrapper.find('[test-id="list-items-col"].mb-6').exists()).toBe(false)
      expect(wrapper.find('[test-id="list-actions-col"].ml-12').exists()).toBe(true)
    })

    it('WHEN on mdAndDown Vuetify breakpoint', async () => {
      wrapper.vm.lgAndUp = false
      wrapper.vm.mdAndDown = true

      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent({ name: 'ListItems' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'ListActions' }).exists()).toBe(true)

      // checks for layout positioning
      expect(wrapper.find('[test-id="sortable-list-wrapper"].flex-column').exists()).toBe(true)
      expect(wrapper.find('[test-id="list-items-col"].mr-12').exists()).toBe(false)
      expect(wrapper.find('[test-id="list-items-col"].mb-6').exists()).toBe(true)
      expect(wrapper.find('[test-id="list-actions-col"].ml-12').exists()).toBe(false)
      expect(wrapper.find('[test-id="list-actions-col"]').exists()).toBe(true)
    })
  })
})
