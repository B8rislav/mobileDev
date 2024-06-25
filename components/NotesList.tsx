import { useAppSelector } from '@/store/hooks';
import { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Note } from './types';
import { NoteElement } from './ui/Note';

type NotesListProps = {
  handleEditNote: (note: Note) => void;
};

/* List of notes */
export const NotesList: FC<NotesListProps> = (props) => {
  const { handleEditNote } = props;

  const notes = useAppSelector((state) => state.notes.notes);

  return (
    <ScrollView style={styles.noteList}>
      {notes.map((note) => (
        <NoteElement
          key={note.id}
          title={note.title}
          onPress={() => handleEditNote(note)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noteList: {
    flex: 1,
  },
});
