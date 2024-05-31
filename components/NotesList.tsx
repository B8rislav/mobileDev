import { useAppSelector } from '@/store/hooks';
import { FC } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Note } from './types';

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
        <Pressable key={note.id} onPress={() => handleEditNote(note)}>
          <Text style={styles.noteTitle}>{note.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
});
