import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return filter
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
      : anecdotes;
  });

  const vote = (id) => {
    dispatch(addVote(id));
    console.log("vote", id);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
