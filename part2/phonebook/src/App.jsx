import { useState, useEffect } from "react";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import Search from "./components/Search.jsx";
import personsService from "./services/persons.js";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPerson(response.data);
    });
  });

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

    personsService.create(newPerson).then((response) => {
      setPerson(persons.concat(response.data));
      setPerson("");
    });

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

  const removePerson = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    console.log(filteredPerson);
    console.log(id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Supprimer ${personName} ?`)) {
      personsService.remove(personId);
      console.log(`${personName} successfully deleted`);
      setMessage(`${personName} was successfully deleted`);
      setPerson(persons.filter((person) => person.id !== personId));
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
