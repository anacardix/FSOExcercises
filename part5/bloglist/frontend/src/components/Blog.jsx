import BlogContent from "./BlogContent";

const Blog = ({ user, handleLogout, blogs, updateBlog, removeBlog }) => {
  return (
    <>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogContent
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
      </div>
    </>
  );
};

export default Blog;
