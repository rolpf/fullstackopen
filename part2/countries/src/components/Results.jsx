import Country from "./Country.jsx";

const Results = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } 

 return (
     <ul>
        {countries.map((country, i) => (
          <li key={i}>
            {country.name.common}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    );
};

export default Results;
