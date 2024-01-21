import { useState } from "react";
import PropTypes from "prop-types";

const BlogContent = ({ blog, updateBlog, removeBlog, user }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false);

  const showWhenVisible = { display: detailsVisibility ? "" : "none" };

  const buttonLabel = detailsVisibility ? "hide" : "view";

  const toggleVisibility = () => {
    setDetailsVisibility(!detailsVisibility);
  };

  const handleLikes = (blog) => {
    updateBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id });
  };

  const handleRemove = (blog) => {
    removeBlog(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p className="blogInfo">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </p>
      <div style={showWhenVisible} className="blogDetails">
        <p>{blog.url}</p>
        <p id="likes">
          {blog.likes}
          <button id="like" onClick={() => handleLikes(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

BlogContent.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogContent;
