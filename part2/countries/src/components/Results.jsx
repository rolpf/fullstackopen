import Country from "./Country.jsx";
const Results = ({ countries, setCountries, setSearchFilter }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (
    (countries.length > 1 && countries.length < 10) ||
    countries.length === 0
  ) {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={i}>
            {country.name.common}
            <button onClick={(e) => setSearchFilter(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <Country country={countries[0]} />;
  }
};

export default Results;
