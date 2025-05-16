import { test, describe, after, beforeEach } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../app.js";
import helper from "./test_helper.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const api = supertest(app);

const blogs = [
  {
    id: "68223c4600f38814dea57e0c",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "68223c4600f38814dea57e0e",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "68223c4600f38814dea57e10",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "68223c4600f38814dea57e12",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  },
  {
    id: "68223c4600f38814dea57e14",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "68223c4600f38814dea57e16",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((e) => e.title);
  assert(titles.includes("React patterns"));
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Jose Brevet",
    url: "https://google.com",
    likes: 2,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  assert(titles.includes("async/await simplifies making async calls"));
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Jose Brevet",
    url: "https://google.com",
    likes: 2,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("dummy returns one", () => {
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    assert.strictEqual(result, 7);
  });
  test("when list has many blogs, equal of all blog likes combined", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });

  test("when list has no blogs, likes should equal to zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favorite blog", () => {
  test("when list has many blogs, return the most liked blog", () => {
    const result = listHelper.favoriteBlogs(blogs);
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("author with most written blogs", () => {
  test("of empty list is {}", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, {});
  });
  test("when list has many blogs, return the author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("Author whose blog posts have the largest amount of likes", () => {
  test("of empty list is {}", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog equals to the author of that blog", () => {
    const blog = blogs[0];
    const result = listHelper.mostLikes([blog]);
    assert.deepStrictEqual(result, {
      author: blog.author,
      likes: 7,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
test.only("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// USER TESTS

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

describe("when there is initially one user in db", () => {
  // ...

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
