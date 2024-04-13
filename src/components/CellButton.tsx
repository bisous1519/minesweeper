import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 5,
    borderTopColor: '#f8f8f8',
    borderLeftColor: '#f8f8f8',
    backgroundColor: '#e6e6e6',
    borderRightColor: '#b0b0b0',
    borderBottomColor: '#b0b0b0',
  },
  pressed: {
    borderWidth: 0.5,
    borderTopColor: '#b0b0b0',
    borderLeftColor: '#b0b0b0',
    backgroundColor: '#dadada',
    borderRightColor: '#b0b0b0',
    borderBottomColor: '#b0b0b0',
  },
});

type CellButtonPropsType = {
  el: number;
  rIdx: number;
  cIdx: number;
  onPressCell: (r: number, c: number) => void;
  onLongPressCell: (r: number, c: number) => void;
  isPressed: boolean;
};

export default function CellButton({
  el,
  rIdx,
  cIdx,
  onPressCell,
  onLongPressCell,
  isPressed,
}: CellButtonPropsType): React.JSX.Element {
  const MINE = -1;
  const FLAG = -2;

  return (
    <Pressable
      style={[styles.wrapper, isPressed && styles.pressed]}
      onPress={() => onPressCell(rIdx, cIdx)}
      onLongPress={() => onLongPressCell(rIdx, cIdx)}
    >
      {isPressed && (
        <Text style={el === 0 && { opacity: 0 }}>
          {el === FLAG ? '🚩' : el}
        </Text>
      )}
      {!isPressed && el === FLAG && <Text>🚩</Text>}
    </Pressable>
  );
}

