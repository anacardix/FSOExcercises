const Person = ({ person, onClickDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => onClickDelete(person.id)}>delete</button>
    </div>
  );
};

export default Person;
