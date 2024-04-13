import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: 4,
    borderTopColor: '#f8f8f8',
    borderLeftColor: '#f8f8f8',
    backgroundColor: '#e6e6e6',
    borderRightColor: '#b0b0b0',
    borderBottomColor: '#b0b0b0',
  },
});

type CellButtonPropsType = {
  el: number;
  rIdx: number;
  cIdx: number;
};

export default function CellButton({
  el,
  rIdx,
  cIdx,
}: CellButtonPropsType): React.JSX.Element {
  const onPressCell = () => {
    alert(`${el} (${rIdx}, ${cIdx})`);
  };

  return (
    <Pressable style={styles.wrapper} onPress={onPressCell}>
      <Text>{el}</Text>
    </Pressable>
  );
}

