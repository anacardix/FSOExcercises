const PersonForm = ({
  onSumbit,
  newName,
  onChangeName,
  newNumber,
  onChangeNumber,
}) => {
  return (
    <>
      <form onSubmit={onSumbit}>
        <div>
          name: <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
