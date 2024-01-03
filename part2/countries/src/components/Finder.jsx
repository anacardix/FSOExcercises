const Finder = ({ searchCountry, onChange }) => {
  return (
    <form>
      <div>
        find countries <input value={searchCountry} onChange={onChange} />
      </div>
    </form>
  );
};

export default Finder;
