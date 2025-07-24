import Togglable from "./Togglable";

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  return (
    <div>
      <h3>{blog.title}</h3> by {blog.author}
      <Togglable buttonLabel="view">
        {blog.likes} likes
        <button id="likes-button" onClick={() => updateLikes(blog)}>
          like
        </button>
        <button id="delete-button" onClick={() => deleteBlog(blog)}>
          delete
        </button>
      </Togglable>
      <hr></hr>
    </div>
  );
};

export default Blog;
