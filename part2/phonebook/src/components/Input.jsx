const Input = ({ type, value, handleChange }) => {
  return (
    <>
      <input type={type} value={value} onChange={handleChange} />
    </>
  );
};

export default Input;
