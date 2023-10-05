import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useAlertSnackbar = defineStore('alert', () => {
  const alertText: Ref<string> = ref('')
  const alertType: Ref<'error' | 'success' | ''> = ref('')
  const isVisible: Ref<boolean> = ref(false)

  const show = ({ type, text }: { type: 'success' | 'error'; text: string }) => {
    alertText.value = text
    alertType.value = type
    isVisible.value = true
  }

  const close = () => {
    isVisible.value = false
    setTimeout(() => {
      alertType.value = ''
      alertText.value = ''
    }, 500)
  }

  return { alertText, alertType, isVisible, show, close }
})
