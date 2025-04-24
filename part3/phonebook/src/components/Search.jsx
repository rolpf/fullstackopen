const Search = ({ searchQuery, setSearchQuery, persons }) => {
  return (
    <>
      <h2>Search</h2>
      <label>search:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
    </>
  );
};

export default Search;