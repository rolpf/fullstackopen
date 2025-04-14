import { useState, useEffect } from "react";
import Form from "./components/Form.jsx";
import Notification from "./components/Notification.jsx";
import Persons from "./components/Persons.jsx";
import Search from "./components/Search.jsx";
import personsService from "./services/persons.js";
import "./index.css";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPersons = persons
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (persons) {
      personsService.getAll().then((response) => {
        setPerson(response.data);
      });
    }
  }, [persons]);

  const addName = (event) => {
    event.preventDefault();

    const person = filteredPersons.filter(
      (person) => person.name === nameInput
    );

    const personToAdd = person[0];
    const updatedPerson = { ...personToAdd, number: phoneInput };

    if (
      persons.some(
        (persons) => persons.name === nameInput || persons.phone === phoneInput
      )
    ) {
      if (
        window.confirm(
          `${nameInput} est déjà présent. Changer le numéro de téléphone de ${nameInput} ?`
        )
      ) {
        console.log(updatedPerson.id);
        personsService.updatePhone(updatedPerson.id, phoneInput);
      }
      return;
    }
    const newPerson = {
      name: nameInput,
      phone: phoneInput,
    };

    personsService.create(newPerson).then((response) => {
      setPerson(persons.concat(response.data));
      setPerson("");
      setMessage(`${newPerson.name} was successfully added to the phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
    if (!persons) return;
    const filteredPerson = persons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Supprimer ${personName} ?`)) {
      personsService.remove(personId);
      console.log(`${personName} successfully deleted`);
      setMessage(`${personName} was successfully deleted`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setPerson(persons.filter((person) => person.id !== personId));
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
      <Notification message={message} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
