import { useAnecdotes, useAnecdoteActions } from "../stores/anecdote";
import { useNotificationActions } from "../stores/notification";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { addVotes, deleteAnecdote } = useAnecdoteActions();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => {
    return b.votes - a.votes;
  });
  const { setNotification } = useNotificationActions();

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => {
            addVotes(anecdote.id);
            setNotification(`'${anecdote.content}' voted`);
          }}
        >
          vote
        </button>{" "}
        {anecdote.votes === 0 && (
          <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
        )}
      </div>
    </div>
  ));
};

export default AnecdoteList;
