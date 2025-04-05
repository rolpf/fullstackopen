import { useState } from "react";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import Search from "./components/Search.jsx";

const App = () => {
  const [persons, setPerson] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  console.log(filteredPersons);

  return (
    <div>
      <h1>Phonebook</h1>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        persons={persons}
      />
      <h2>Add new</h2>
      <Form
        addName={addName}
        nameInput={nameInput}
        phoneInput={phoneInput}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
