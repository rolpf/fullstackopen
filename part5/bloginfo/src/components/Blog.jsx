import Togglable from "./Togglable";
const Blog = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3> by {blog.author}
      <Togglable buttonLabel="view">{blog.likes} likes </Togglable>
      <hr></hr>
    </div>
  );
};

export default Blog;
