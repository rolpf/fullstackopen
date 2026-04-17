import { useAnecdotes, useAnecdoteActions } from "../stores/anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVotes } = useAnecdoteActions();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => {
    return b.votes - a.votes;
  });

  return sortedAnecdotes.map((anecdote) => (
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
