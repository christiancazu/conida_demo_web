import { Notification } from 'element-ui'

export const toastSuccess = (message, title = 'Correcto') => {
  Notification.success({
    title,
    message,
    type: 'success'
  })
}
export const toastInfo = (message, title = 'Atención') => {
  Notification.success({
    title,
    message,
    type: 'info'
  })
}
export const toastError = (message, title = 'Ha ocurrido un error') => {
  Notification.success({
    title,
    message,
    type: 'error'
  })
}
