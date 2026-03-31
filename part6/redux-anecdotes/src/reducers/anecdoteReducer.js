import generateId from "../utils/utils.js";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0,
  };
};

let sortedAnecdotes = [...anecdotesAtStart];

const sortArray = (a, b) => {
  if (a.votes > b.votes) {
    return -1;
  }
  if (a.votes < b.votes) {
    return 1;
  } else {
    return 0;
  }
};
sortedAnecdotes.sort(sortArray);

const initialState = sortedAnecdotes.map(asObject);

export const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return state.concat(action.payload);
    case "VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort(sortArray);
    }
    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export default anecdoteReducer;
