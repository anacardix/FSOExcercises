import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  return <div style={notification.style}>{notification.text}</div>;
};

export default Notification;
