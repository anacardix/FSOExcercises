import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return <div style={notification.style}>{notification.text}</div>;
};

export default Notification;
