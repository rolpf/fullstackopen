const Filter = ({ searchFilter, onChange }) => {
  return (
    <>
      <label>find countries:</label>
      <input type="text" value={searchFilter} onChange={onChange}></input>
    </>
  );
};

export default Filter;
