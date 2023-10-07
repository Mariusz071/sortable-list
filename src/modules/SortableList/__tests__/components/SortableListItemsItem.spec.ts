import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { mockPostsResponse } from './mocks'
import SortableListItemsItem from '@/modules/SortableList/components/SortableListItemsItem.vue'

describe('SortableListItemsItem', () => {
  const post = mockPostsResponse.data[0]
  const wrapper = mount(SortableListItemsItem, {
    global: {
      plugins: [vuetify]
    },
    propsData: {
      index: 0,
      post
    }
  })

  describe('renders correctly', () => {
    it('WHEN at index 0', () => {
      const expectedText = `Post ${wrapper.vm.post.id}`
      expect(wrapper.find('[test-id="post-text"]').text()).toBe(expectedText)
      expect(wrapper.findComponent({ name: 'VCard' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VCardText' }).exists()).toBe(true)
      expect(wrapper.find('[test-id="move-up-btn"]').exists()).toBe(false)
      expect(wrapper.find('[test-id="move-down-btn"]').exists()).toBe(true)
    })

    it('WHEN at index some middle index', async () => {
      wrapper.setProps({ index: 2 })
      await wrapper.vm.$nextTick()

      const expectedText = `Post ${wrapper.vm.post.id}`
      expect(wrapper.find('[test-id="post-text"]').text()).toBe(expectedText)
      expect(wrapper.findComponent({ name: 'VCard' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VCardText' }).exists()).toBe(true)
      expect(wrapper.find('[test-id="move-up-btn"]').exists()).toBe(true)
      expect(wrapper.find('[test-id="move-down-btn"]').exists()).toBe(true)
    })

    it('WHEN at last possible index index', async () => {
      wrapper.setProps({ index: 4 })
      await wrapper.vm.$nextTick()

      const expectedText = `Post ${wrapper.vm.post.id}`
      expect(wrapper.find('[test-id="post-text"]').text()).toBe(expectedText)
      expect(wrapper.findComponent({ name: 'VCard' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'VCardText' }).exists()).toBe(true)
      expect(wrapper.find('[test-id="move-up-btn"]').exists()).toBe(true)
      expect(wrapper.find('[test-id="move-down-btn"]').exists()).toBe(false)
    })
  })

  describe('Fires correct logic', () => {
    it('WHEN moving post up', async () => {
      const moveUpBtn = wrapper.find('[test-id="move-up-btn"]')
      moveUpBtn.trigger('click')
      await wrapper.vm.$nextTick()

      const expectedEmitPayload = {
        from: wrapper.vm.props.index,
        type: 'up',
        postId: wrapper.vm.props.post.id
      }

      //@ts-ignore
      expect(wrapper.emitted()['move-post'][0][0]).toStrictEqual(expectedEmitPayload)
    })

    it('WHEN moving post down', async () => {
      wrapper.setProps({ index: 0 })
      await wrapper.vm.$nextTick()

      const moveDownBtn = wrapper.find('[test-id="move-down-btn"]')
      moveDownBtn.trigger('click')
      await wrapper.vm.$nextTick()

      const expectedEmitPayload = {
        from: wrapper.vm.props.index,
        type: 'down',
        postId: wrapper.vm.props.post.id
      }

      //@ts-ignore
      expect(wrapper.emitted()['move-post'][1][0]).toStrictEqual(expectedEmitPayload)
    })
  })
})
