import express from "express";
import jwt from "jsonwebtoken";
const blogsRouter = express.Router();
import Blog from "../models/blog.js";
import User from "../models/user.js";

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes || 0,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const { likes } = request.body;

  Blog.findById(request.params.id).then((blog) => {
    if (!blog) {
      return response.status(404).end();
    }
    blog.likes = likes;

    return blog
      .save()
      .then((updatedBlog) => {
        response.json(updatedBlog);
      })
      .catch((error) => next(error));
  });
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    try {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  } else {
    return response.status(401).json({ error: `Unauthorized` });
  }
});

export default blogsRouter;
