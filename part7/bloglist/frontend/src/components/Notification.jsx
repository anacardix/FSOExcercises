import { useNotificationValue } from "../NotificationContext";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const notification = useNotificationValue();
  return (
    <div>
      {notification ? (
        <Alert variant={notification.type}>{notification.message}</Alert>
      ) : null}
    </div>
  );
};

export default Notification;
