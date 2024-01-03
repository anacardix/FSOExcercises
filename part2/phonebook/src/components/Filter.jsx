const Filter = ({ searchName, onChange }) => {
  return (
    <>
      <form>
        <div>
          filter shown with:{" "}
          <input value={searchName} onChange={onChange} />
        </div>
      </form>
    </>
  );
};

export default Filter;
