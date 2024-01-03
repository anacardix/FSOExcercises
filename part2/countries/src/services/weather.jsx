import axios from "axios";
const OWMkey = import.meta.env.VITE_OWM_KEY;
const basicUrl = "http://api.openweathermap.org/data/2.5/weather?";

const get = (city) => {
  const request = axios.get(
    `${basicUrl}q=${city}&units=metric&appid=${OWMkey}`
  );
  return request.then((response) => response.data);
};

export default {
  get,
};
