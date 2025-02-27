import { useState } from "react";

const App = () => {
  const [persons, setPerson] = useState([{ name: "Arto Hellas" }]);
  const [inputString, setinputString] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: inputString,
    };

    if (persons.some((persons) => persons.name === inputString)) {
      console.log(persons, "existe deja");
    } else {
      setPerson((previous) => [...previous, nameObject]);
      setinputString("");
    }
  };

  const handleNameChange = (event) => {
    setinputString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={inputString} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
