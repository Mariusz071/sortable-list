import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { mockActions } from './mocks'
import SortableListActionsAction from '@/modules/SortableList/components/SortableListActionsAction.vue'

describe('SortableListActionsAction', () => {
  const action = mockActions[0]

  const wrapper = mount(SortableListActionsAction, {
    global: {
      plugins: [vuetify]
    },
    propsData: {
      action
    }
  })

  it('renders correctly', async () => {
    await wrapper.vm.$nextTick()

    const expectedText = `Moved post ${action.postId} from index ${action.from} to index ${action.to}`
    expect(wrapper.find('[test-id="action-text"]').text()).toBe(expectedText)

    const timeTravelBtn = wrapper.find('[test-id="time-travel-btn"]')
    expect(timeTravelBtn.exists()).toBe(true)

    const expectedBtnText = 'Time travel'
    expect(timeTravelBtn.text()).toBe(expectedBtnText)
  })

  it('WHEN clicking "Time travel" correct logic is being fired', async () => {
    wrapper.setProps({ isActionActive: false })
    await wrapper.vm.$nextTick()

    const timeTravelBtn = wrapper.find('[test-id="time-travel-btn"]')
    timeTravelBtn.trigger('click')
    await wrapper.vm.$nextTick()

    //@ts-ignore
    expect(wrapper.emitted()['time-travel'][0][0]).toStrictEqual(wrapper.vm.action)
  })
})
