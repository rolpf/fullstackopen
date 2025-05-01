const Persons = ({ persons, removePerson }) => {
  return (
    <ul>
      yo
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.phone} - {person.id}
          <button onClick={() => removePerson(person.id)}>remove</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
