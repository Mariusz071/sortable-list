import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAlertSnackbar } from '@/stores/alertSnackbar'

describe('sortableList store', () => {
  let store
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAlertSnackbar()
  })

  it('WHEN initialized, has correct values', () => {
    expect(store.alertText).toStrictEqual('')
    expect(store.alertType).toStrictEqual('')
    expect(store.isVisible).toBe(false)
  })

  it('WHEN show action is triggered, correct logic is fired', () => {
    const showPayload = { type: 'error', text: 'Random error' }
    store.show(showPayload)

    expect(store.alertText).toBe(showPayload.text)
    expect(store.alertType).toBe(showPayload.type)
    expect(store.isVisible).toBe(true)
  })

  it('WHEN close action is triggered, correct logic is fired', () => {
    vi.useFakeTimers()
    const showPayload = { type: 'error', text: 'Random error' }
    store.show(showPayload)

    store.close()
    vi.advanceTimersByTime(600)

    expect(store.alertText).toStrictEqual('')
    expect(store.alertType).toStrictEqual('')
    expect(store.isVisible).toBe(false)
  })
})
