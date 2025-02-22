import { useState } from "react";

const Header = (props) => {
  return <>{props.text}</>;
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

const Statistics = (props) => {
  const { text, good, neutral, bad } = props;
  const all = good + bad + +neutral;

  if (all === 0) {
    return (
      <div>
        <Header text="statistic" />
        No feedback given{" "}
      </div>
    );
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <Header text="statistic" />
            </th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="good" stat={good} />
          <Statistic text="neutral" stat={neutral} />
          <Statistic text="bad" stat={bad} />
          <Statistic text="total" stat={good + neutral + bad} />
          <Statistic text="average" stat={good - bad / all} />
          <Statistic text="positive" stat={String((good / all) * 100) + " %"} />
        </tbody>
      </table>
    </>
  );
};

const Statistic = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.stat}</td>
      </tr>
    </>
  );
};

const App = () => {
  const title = "give feedback";
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title={title} />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics
        title={"statistics"}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
