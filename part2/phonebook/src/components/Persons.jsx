const Persons = ({ persons, removePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.phone}
          <button onClick={() => removePerson(person.id)}>remove</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
