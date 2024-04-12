import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffadba',
    paddingVertical: 15,
    // paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  text: {
    fontSize: 27,
  },
});

export default function StartButton(): React.JSX.Element {
  return (
    <Pressable style={styles.wrapper}>
      <Text style={styles.text}>START</Text>
    </Pressable>
  );
}

