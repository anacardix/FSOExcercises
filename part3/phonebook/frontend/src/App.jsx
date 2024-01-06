import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const personsToShow = searchName
    ? persons.filter((person) => person.name.includes(searchName))
    : persons;

  function resetNotification() {
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  }

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const onChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const updatePerson = persons.find((person) => person.name === newName);

    if (updatePerson) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = { ...updatePerson, number: newNumber };

        personService
          .update(newPerson.id, newPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id !== newPerson.id ? person : newPerson
              )
            );
            setNewName("");
            setNewNumber("");

            setNotification({
              type: "success",
              message: `${updatePerson.name}'s number changed`,
            });
            resetNotification();
          })
          .catch((error) => {
            setNotification({
              type: "error",
              message: error,
            });
            resetNotification();
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");

          setNotification({
            type: "success",
            message: `${newPerson.name} created`,
          });
          resetNotification();
        })
        .catch((error) => {
          setNotification({
            type: "error",
            message: error,
          });
          resetNotification();
        });
    }
  };

  const onClickDelete = (id) => {
    if (
      confirm(`Delete ${persons.find((person) => person.id === id).name} ?`)
    ) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setNotification({
            type: "success",
            message: `${
              persons.find((person) => person.id === id).name
            } deleted`,
          });
          resetNotification();
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== id));

          setNotification({
            type: "error",
            message: `Information of ${
              persons.find((person) => person.id === id).name
            } has already been removed from server`,
          });
          resetNotification();
        });
    }
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchName={searchName} onChange={onChangeSearchName} />
      <h3>Add a new</h3>
      <PersonForm
        onSumbit={addPerson}
        newName={newName}
        onChangeName={onChangeName}
        newNumber={newNumber}
        onChangeNumber={onChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onClickDelete={onClickDelete} />
    </div>
  );
};

export default App;
