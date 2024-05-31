import { NotesList } from '@/components/NotesList';
import { addNote, deleteNote, editNote } from '@/components/state/notesSlice';
import { Note } from '@/components/types';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  // Array to store notes

  // Selected note for editing
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Note title
  const [title, setTitle] = useState<Note['title']>('');

  // Note content
  const [content, setContent] = useState<Note['content']>('');

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle editing a note
  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  // Function to handle saving a note
  const handleSaveNote = () => {
    if (selectedNote) {
      const id = selectedNote.id;
      dispatch(editNote({ id, title, content }));
      setSelectedNote(null);
    } else {
      // If no note is selected, add a new note
      dispatch(addNote({ title, content }));
    }
    setTitle('');
    setContent('');
    setModalVisible(false);
  };

  // Function to handle deleting a note
  const handleDeleteNote = (note: Note) => {
    dispatch(deleteNote(note.id));
    setSelectedNote(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Notes</Text>

      <NotesList handleEditNote={handleEditNote} />

      {/* Add Note button */}
      <Pressable
        style={styles.addButton}
        onPress={() => {
          setTitle('');
          setContent('');
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Note</Text>
      </Pressable>

      {/* Modal for creating/editing notes */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Note title input */}
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Note content input */}
          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Enter note content"
            value={content}
            onChangeText={setContent}
          />

          {/* Buttons for saving, canceling, and deleting */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleSaveNote}
              style={{ ...styles.saveButton, ...styles.noteControl }}
            >
              <Text style={styles.noteControlText}>Save</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ ...styles.noteControl, ...styles.cancelButton }}
            >
              <Text style={styles.noteControlText}>Cancel</Text>
            </Pressable>
            {selectedNote && (
              <Pressable
                onPress={() => handleDeleteNote(selectedNote)}
                style={{ ...styles.noteControl, ...styles.deleteButton }}
              >
                <Text style={styles.noteControlText}>Delete</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#e6e6e6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    verticalAlign: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteControl: {
    width: 60,
    height: 30,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteControlText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#007BFF',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButton: {
    backgroundColor: '#FF9500',
  },
});
