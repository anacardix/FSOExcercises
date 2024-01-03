import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = ({ country }) => {
  const [weatherInfo, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .get(country.capital[0])
      .then((response) => setWeather(response));
  }, []);

  if (!weatherInfo) {
    return <></>;
  }

  return (
    <>
      <h1>Weather in {country.capital[0]}</h1>
      <p>temperature {weatherInfo.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
      />
      <p>wind {weatherInfo.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
