import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total sum={parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </>
  );
};

export default Content;
