
const initialState = {
  content: 'This is notification. It works, yes, of course. It can also be hidden, yes',
  hidden: true
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        hidden: false,
        content: action.notification
      }
    case 'HIDE':
      return {
        content: '',
        hidden: true
      }
    default:
      return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer
