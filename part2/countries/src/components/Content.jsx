import React, { useState } from "react";
import Country from "./Country";

const Content = ({ countries }) => {
  const [visibleCountries, setVisibleCountries] = useState({});

  const toggleVisibility = (countryName) => {
    setVisibleCountries((visible) => ({
      ...visible,
      [countryName]: !visible[countryName],
    }));
  };

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((country) => (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={() => toggleVisibility(country.name.common)}>
          {visibleCountries[country.name.common] ? "Hide" : "Show"}
        </button>
        {visibleCountries[country.name.common] && <Country country={country} />}
      </div>
    ));
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
};

export default Content;
