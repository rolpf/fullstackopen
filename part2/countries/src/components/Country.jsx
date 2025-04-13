const Country = ({ country }) => {
  console.log(country);
  return (
    <>
      <h2>{country.name.common}</h2>
      <ul>
        <li>capital city : {country.capital}</li>
        <li>population : {country.population}</li>
      </ul>
      <h3>Flag</h3>
      <img src={country.flags.png} alt={country.flags.alt} width="100px"></img>
    </>
  );
};

export default Country;
