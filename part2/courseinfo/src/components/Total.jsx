const Total = (props) => {
  let sum = 0;
  const initialValue = 0;
  //  props.parts.map((part) => (sum += part.exercises)); // sum with map
  const sumReduce = props.parts.reduce(
    (accumulator, part) => (accumulator += part.exercises),
    initialValue
  ); // same sum with reduce method

  console.log(sumReduce);

  return (
    <>
      <p>Number of exercises {sumReduce}</p>
    </>
  );
};

export default Total;
