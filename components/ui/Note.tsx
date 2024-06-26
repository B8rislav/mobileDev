import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type NoteElementProps = {
  onPress: () => void;
  title: string;
};

export const NoteElement: FC<NoteElementProps> = (props) => {
  const { onPress, title } = props;

  return (
    <Pressable onPress={onPress}>
      <Text testID="list-item" style={styles.noteTitle}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
