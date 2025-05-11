import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

const blogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

test("dummy returns one", () => {
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    console.log(blogs[0]);
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
