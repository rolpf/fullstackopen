import { useAnecdotes, useAnecdoteActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVotes } = useAnecdoteActions();

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addVotes(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
