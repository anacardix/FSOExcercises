import Weather from "./Weather";

const Country = ({ country }) => {
  const languages = Object.entries(country.languages).map(([key, value]) => {
    return { key, value };
  });

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => {
          return <li key={language.key}>{language.value}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      <Weather country={country} />
    </>
  );
};

export default Country;
