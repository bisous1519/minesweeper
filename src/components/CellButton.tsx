import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // height: 40,
    // borderWidth: 5,
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
  size: number;
  onPressCell: (r: number, c: number) => void;
  onLongPressCell: (r: number, c: number) => void;
  isPressed: boolean;
  finTrigger: { r: number; c: number } | undefined;
  elOri: number;
};

export default function CellButton({
  el,
  rIdx,
  cIdx,
  size,
  onPressCell,
  onLongPressCell,
  isPressed,
  finTrigger,
  elOri,
}: CellButtonPropsType): React.JSX.Element {
  const MINE = -1;
  const FLAG = -2;
  const WRONG = -3;

  const elColor = [
    '#718DFF',
    '#3CD5BD',
    '#ff7171',
    '#ffd971',
    '#db71ff',
    '#b8ff71',
    '#ff8971',
    '#FF4B4D',
  ];

  return (
    <Pressable
      style={[
        styles.wrapper,
        { width: size, height: size, borderWidth: 5 * (size / 46) },
        isPressed && styles.pressed,
        finTrigger &&
          finTrigger.r === rIdx &&
          finTrigger.c === cIdx && { backgroundColor: '#FF4A4B' },
      ]}
      onPress={() => onPressCell(rIdx, cIdx)}
      onLongPress={() => onLongPressCell(rIdx, cIdx)}
    >
      {el === FLAG && <Text style={{ fontSize: 25 * (size / 46) }}>🚩</Text>}
      {el === WRONG && (
        <>
          <Text style={{ fontSize: 25 * (size / 46) }}>🚩</Text>
          <FontAwesome6
            style={{
              position: 'absolute',
            }}
            name='xmark'
            size={35 * (size / 46)}
            color='#FF4A4B'
          />
        </>
      )}
      {isPressed &&
        (elOri === MINE ? (
          <Text style={{ fontSize: 25 * (size / 46) }}>💣</Text>
        ) : (
          <Text
            style={[
              { fontSize: 25 * (size / 46), fontWeight: 'bold' },
              el === 0 ? { opacity: 0 } : { color: elColor[el - 1] },
            ]}
          >
            {el}
          </Text>
        ))}
    </Pressable>
  );
}

