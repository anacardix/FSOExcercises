import { useState, useEffect } from "react";
import countriesService from "./services/countries";

import Finder from "./components/Finder";
import Content from "./components/Content";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  
  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const countriesToShow = searchCountry
    ? countries.filter((country) => country.name.common.includes(searchCountry))
    : [];

  const onChangeSearchCountry = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <>
      <Finder searchCountry={searchCountry} onChange={onChangeSearchCountry} />
      <Content countries={countriesToShow} />
    </>
  );
}

export default App;
