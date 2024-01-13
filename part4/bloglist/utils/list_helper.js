const _ = require("lodash");

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  }, blogs[0]);

  return mostLikedBlog ? mostLikedBlog : {};
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorsWithBlogCount = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  return _.maxBy(authorsWithBlogCount, "blogs");
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorsWithLikesCount = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: totalLikes(blogs),
  }));

  return _.maxBy(authorsWithLikesCount, "likes");
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
