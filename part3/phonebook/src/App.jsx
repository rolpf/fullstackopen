import { useState, useEffect } from "react";
import Form from "./components/Form.jsx";
import Notification from "./components/Notification.jsx";
import Persons from "./components/Persons.jsx";
import Search from "./components/Search.jsx";
import personsService from "./services/persons.js";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredPersons = persons
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const addName = (event) => {
    event.preventDefault();

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
        const person = persons.find((person) => person.name === nameInput);
        const updatedPerson = { ...person, phone: phoneInput };

        personsService
          .updatePhone(updatedPerson.id, phoneInput)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setMessage(error.response.data.error);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: nameInput,
        phone: phoneInput,
      };
      personsService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setMessage(
            `${newPerson.name} was successfully added to the phonebook`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(error.response.data.error);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
    //setPersons((previous) => [...previous, newPerson]);
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
      setPersons(persons.filter((person) => person.id !== personId));
    }
  };

  return (
    <>
      <h1 className="flex justify-center">Phonebook</h1>
      <div className="md:flex md:justify-center">
        <div className="md:flex md:flex-col px-12 w-100">
          <h2>Add new</h2>
          <Form
            addName={addName}
            nameInput={nameInput}
            phoneInput={phoneInput}
            handleNameChange={handleNameChange}
            handlePhoneChange={handlePhoneChange}
          />
          <Notification message={message} />
        </div>
        <div className="md:flex md:flex-col px-12 w-1s00">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <h2>Numbers</h2>
          <Persons persons={filteredPersons} removePerson={removePerson} />
        </div>
      </div>
    </>
  );
};

export default App;
