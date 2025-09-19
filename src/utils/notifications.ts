import { ElNotification } from 'element-plus'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationOptions {
  title: string
  message: string
  type: NotificationType
  duration?: number
}

export const showNotification = (options: NotificationOptions | string, message?: string, type?: NotificationType) => {
  if (typeof options === 'string') {
    ElNotification({
      title: 'Уведомление',
      message: options,
      type: type || 'info',
      duration: 3000,
    })
    return
  }

  // Если передан объект с опциями
  ElNotification({
    title: options.title,
    message: options.message,
    type: options.type,
    duration: options.duration || 10000,
  })
}

// Удобные методы для разных типов уведомлений
export const showSuccess = (message: string, title = 'Успех') => {
  showNotification({ title, message, type: 'success' })
}

export const showError = (message: string, title = 'Ошибка') => {
  showNotification({ title, message, type: 'error' })
}

export const showWarning = (message: string, title = 'Предупреждение') => {
  showNotification({ title, message, type: 'warning' })
}

export const showInfo = (message: string, title = 'Информация') => {
  showNotification({ title, message, type: 'info' })
}
