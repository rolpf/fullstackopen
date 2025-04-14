const Filter = ({ searchFilter, setSearchFilter }) => {
  return (
    <>
      <label>find countries:</label>
      <input
        type="text"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      ></input>
    </>
  );
};

export default Filter;
