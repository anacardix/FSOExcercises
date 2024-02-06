import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllBlog } from "../services/blogs";
import Togglable from "./Togglable";
import BlogCreate from "./BlogCreate";
import Table from "react-bootstrap/Table";

const Blogs = () => {
  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlog,
    refetchOnWindowFocus: false,
  });

  const blogCreateVisibility = useRef();

  if (blogs.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>blogs</h3>
      <Togglable buttonLabel="Create new blog" ref={blogCreateVisibility}>
        <BlogCreate />
      </Togglable>
      <Table striped className="mt-4">
        <tbody>
          {blogs.data
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
