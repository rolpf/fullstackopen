import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  //console.log("1 " + blogs);
  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(response);
    });
  }, []);
  console.log("2 " + blogs);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification("wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // const loginForm = () => {
  //   <div>
  //     <h2>Login</h2>
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         username
  //         <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           onChange={({ target }) => setUsername(target.value)}
  //         />
  //       </div>
  //       <div>
  //         password
  //         <input
  //           type="text"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //       </div>
  //       <button type="submit">login</button>
  //     </form>
  //   </div>;
  // };

  // const blogList = () => {
  //   <div>
  //     <h2>blogs</h2>
  //     {blogs.map((blog) => (
  //       <Blog key={blog.id} blog={blog} />
  //     ))}
  //   </div>;
  // };

  // {
  //   user === null && loginForm();
  // }
  // {
  //   user !== null && blogList();
  // }

  return (
    <div>
      {user ? (
        <div>
          connected user : {user.username}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="text"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
