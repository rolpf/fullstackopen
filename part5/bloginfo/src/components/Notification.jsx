const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  if (notification.kind === "newBlog") {
    return <div className="newBlog text-blue-900">{notification.message}</div>;
  }
  return <div className="error text-red-900">{notification.message}</div>;
};

export default Notification;
