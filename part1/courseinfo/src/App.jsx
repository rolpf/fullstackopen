const Hello = (props) => {
  return (
    <div>
      <p>
        Hello world {props.name}, you are {props.age}
      </p>
    </div>
  );
};
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="PATATE" age={20} />
    </>
  );
};

export default App;
  