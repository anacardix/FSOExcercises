import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = (event) => {
    dispatch(filter(event.target.value));
  };

  return (
    <>
      filter <input type="text" name="filter" onChange={onChangeFilter} />
    </>
  );
};

export default Filter;
