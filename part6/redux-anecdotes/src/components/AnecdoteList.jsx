import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [
      ...state.anecdotes.filter((anecdote) =>
        state.filter !== ""
          ? anecdote.content.includes(state.filter)
          : anecdote.content
      ),
    ].sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const onClickVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onClickVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
