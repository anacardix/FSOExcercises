import { createContext, useReducer, useContext, useEffect } from 'react'

const visibleStyle = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};

const hiddenStyle = {
  display: "none",
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const initialState = { text: "", style: hiddenStyle };

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { text: action.payload, style: visibleStyle }
    case "HIDE":
        return initialState
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)
  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext