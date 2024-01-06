import axios from "axios";
//const baseUrl = '/api/persons'
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data.error);
      } else {
        return Promise.reject(error.message);
      }
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data.error);
      } else {
        return Promise.reject(error.message);
      }
    });
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data.error);
      } else {
        return Promise.reject(error.message);
      }
    });
};

export default {
  getAll,
  create,
  update,
  del,
};
