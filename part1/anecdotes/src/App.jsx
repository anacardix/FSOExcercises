import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const MostVotedAnecdote = ({ anecdotes }) => {
  const bestAnecdote = findMostVotedAnecdote(anecdotes);

  if (bestAnecdote == -1) {
    return (
      <>
        <Header text="Anecdote with most votes" />
        <p>There's no best anecdote yet</p>
      </>
    );
  } else {
    return (
      <>
        <Header text="Anecdote with most votes" />
        <Anecdote anecdote={anecdotes[bestAnecdote]} />
      </>
    );
  }
};

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <p>{anecdote.text}</p>
      <p>has {anecdote.vote} votes</p>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      text: "If it hurts, do it more often.",
      vote: 0,
    },
    {
      text: "Adding manpower to a late software project makes it later!",
      vote: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0,
    },
    {
      text: "Premature optimization is the root of all evil.",
      vote: 0,
    },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      vote: 0,
    },
    {
      text: "The only way to go fast, is to go well.",
      vote: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const setRandomAnecdote = () => {
    let randomAnecdote;
    do {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    } while (randomAnecdote == selected);

    setSelected(randomAnecdote);
  };

  const voteAnecdote = () => {
    const newAnecdotes = [...anecdotes];

    newAnecdotes[selected] = {
      ...newAnecdotes[selected],
      vote: newAnecdotes[selected].vote + 1,
    };

    setAnecdotes(newAnecdotes);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={setRandomAnecdote} text="next anecdote" />
      <MostVotedAnecdote anecdotes={anecdotes} />
    </>
  );
};

const findMostVotedAnecdote = (anecdotes) => {
  if (anecdotes.length === 0) return -1;

  let maxVote = anecdotes[0].vote;
  let maxIndex = 0;

  for (let i = 1; i < anecdotes.length; i++) {
    if (anecdotes[i].vote > maxVote) {
      maxVote = anecdotes[i].vote;
      maxIndex = i;
    }
  }

  return maxIndex;
};

export default App;
