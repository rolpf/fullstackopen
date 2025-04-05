import { useState } from "react";
import Persons from "./components/Persons.jsx";
import Search from "./components/Search.jsx";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(persons);

  const addName = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (persons) => persons.name === nameInput || persons.phone === phoneInput
      )
    ) {
      alert(`${nameInput} existe deja`);
      return;
    }
    const newPerson = {
      name: nameInput,
      phone: phoneInput,
    };

    setPerson((previous) => [...previous, newPerson]);
    setNameInput("");
    setPhoneInput("");
  };

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneInput(event.target.value);
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredList = persons.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filteredList);
  };
  console.log(filteredItems);

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      search: <input value={searchQuery} onChange={handleSearchChange}></input>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={nameInput} onChange={handleNameChange} />
          phone: <input value={phoneInput} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredItems} />
    </div>
  );
};

export default App;
