import { useAnecdoteActions } from "../stores/anecdote";
import { useNotificationActions } from "../stores/notification";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();
  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await addAnecdote(content);
    setNotification(`'${content}' added`);
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
