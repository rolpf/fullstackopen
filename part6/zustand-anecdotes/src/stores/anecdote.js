import { create } from "zustand";
import anecdoteService from "../services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  votes: 0,
  filter: "",
  actions: {
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },
    addVotes: async (id) => {
      const anecdote = get().anecdotes.find((n) => n.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((n) => (n.id === id ? updated : n)),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  if (filter) {
    return anecdotes.filter((a) => {
      return a.content.toLowerCase().includes(filter.toLowerCase());
    });
  }
  return anecdotes;
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
