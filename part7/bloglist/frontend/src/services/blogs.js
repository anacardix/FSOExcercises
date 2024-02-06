import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllBlog = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, blog, config);
  return response.data;
};

export const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(url, config);
  return response;
};

export const addComment = async ({ blogId, comment }) => {
  const url = `${baseUrl}/${blogId}/comments`;
  const response = await axios.post(url, { comment });
  return response.data;
};

export default { setToken };
