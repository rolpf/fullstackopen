import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import Results from "./components/Results.jsx";
import countriesService from "./services/countries.js";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log("promise fulfilled");
        setAllCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
    if (searchFilter) {
      setCountries(filteredCountries);
    }
  };

  return (
    <>
      <h1>Countries</h1>
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <Results
        countries={filteredCountries}
        setCountries={setCountries}
        setSearchFilter={setSearchFilter}
      />
    </>
  );
};

export default App;
