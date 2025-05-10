const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification validate">{message}</div>;
};

export default Notification;
