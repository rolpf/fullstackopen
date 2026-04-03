import { useDispatch } from "react-redux";
import generateId from "../utils/utils.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch({
      type: "NEW_ANECDOTE",
      payload: {
        content,
        id: generateId(),
        votes: 0,
      },
    });
  };

  return (
    <div>
      {" "}
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
