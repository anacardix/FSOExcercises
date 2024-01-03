import axios from "axios";
const basicUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () => {
  const request = axios.get(`${basicUrl}all`);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
