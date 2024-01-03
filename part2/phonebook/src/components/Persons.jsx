import Person from "./Person";

const Persons = ({ persons, onClickDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} person={person} onClickDelete={onClickDelete} />
      ))}
    </>
  );
};

export default Persons;
