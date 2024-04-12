import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
  },
});

export default function GameContainer(): React.JSX.Element {
  return <View style={styles.container}></View>;
}

