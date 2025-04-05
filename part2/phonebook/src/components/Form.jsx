const Form = ({
  addName,
  nameInput,
  phoneInput,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input type="text" value={nameInput} onChange={handleNameChange} />
          phone: <input value={phoneInput} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;