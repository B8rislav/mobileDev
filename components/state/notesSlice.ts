import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from '../types';

export type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id'>>) => {
      const { title, content } = action.payload;
      const id = Date.now();
      const note = {
        id,
        title,
        content,
      };
      state.notes.push(note);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, title, content } = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === id ? { ...note, title, content } : note,
      );
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
