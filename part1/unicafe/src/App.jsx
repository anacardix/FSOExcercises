import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const all = good + neutral + bad;
  const average = good * 1 + bad * -1;
  const positive = good * (100 / all);

  if (all == 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    );
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? `${value}%` : `${value}`}</td>
    </tr>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const setGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };

  const setNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const setBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <>
      <Header title="Give feedback" />
      <Button onClick={setGood} text="good" />
      <Button onClick={setNeutral} text="neutral" />
      <Button onClick={setBad} text="bad" />
      <Header title="Statistics" />
      <Statistics feedback={feedback} />
    </>
  );
};

export default App;
