import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmitAnecdote = async (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmitAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
