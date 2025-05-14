const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((previousValue, current) => {
    return previousValue + current.likes;
  }, 0);
};

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const resultBlog = blogs.reduce((previousValue, current) =>
    previousValue.likes < current.likes ? current : previousValue
  );
  return {
    title: resultBlog.title,
    author: resultBlog.author,
    likes: resultBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    let authorCounts = blogs.reduce((authorCount, blog) => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
      return authorCount;
    }, {});
    let maxCount = Math.max(...Object.values(authorCounts));
    let mostFrequent = Object.keys(authorCounts).filter(
      (author) => authorCounts[author] === maxCount
    );
    return {
      author: mostFrequent[0],
      blogs: maxCount,
    };
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    let likesCounts = blogs.reduce((likesCount, blog) => {
      likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
      return likesCount;
    }, {});
    let maxCount = Math.max(...Object.values(likesCounts));
    let mostLiked = Object.keys(likesCounts).filter(
      (author) => likesCounts[author] === maxCount
    );
    return {
      author: mostLiked[0],
      likes: maxCount,
    };
  }
};

export default {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
