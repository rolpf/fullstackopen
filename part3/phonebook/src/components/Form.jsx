const Form = ({
  addName,
  nameInput,
  phoneInput,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        <label>name:</label>
        <input type="text" value={nameInput} onChange={handleNameChange} />
        <label>phone:</label>
        <input type="tel" value={phoneInput} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
