import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer.js";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const targetValue = event.target.value.toLowerCase();
    dispatch(filterChange(targetValue));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter : <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
