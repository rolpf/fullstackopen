import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();
  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await addAnecdote(content);
    e.target.reset();
  };
  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
