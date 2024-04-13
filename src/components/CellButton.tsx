import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { StatusType } from '../atoms/atomType';
import { statusState } from '../atoms/atoms';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

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
  finTrigger: { r: number; c: number } | undefined;
  elOri: number;
};

export default function CellButton({
  el,
  rIdx,
  cIdx,
  onPressCell,
  onLongPressCell,
  isPressed,
  finTrigger,
  elOri,
}: CellButtonPropsType): React.JSX.Element {
  const [status, setStatus] = useRecoilState<StatusType>(statusState);

  const MINE = -1;
  const FLAG = -2;
  const WRONG = -3;

  return (
    <Pressable
      style={[
        styles.wrapper,
        isPressed && styles.pressed,
        finTrigger &&
          finTrigger.r === rIdx &&
          finTrigger.c === cIdx && { backgroundColor: '#FF4A4B' },
      ]}
      onPress={() => onPressCell(rIdx, cIdx)}
      onLongPress={() => onLongPressCell(rIdx, cIdx)}
    >
      {el === FLAG && <Text>🚩</Text>}
      {el === WRONG && (
        <>
          <Text>🚩</Text>
          {/* <Feather
            style={{ position: 'absolute' }}
            name='x'
            size={30}
            color='#FF4A4B'
          /> */}
          <FontAwesome6
            style={{
              position: 'absolute',
            }}
            name='xmark'
            size={28}
            color='#FF4A4B'
          />
        </>
      )}
      {isPressed &&
        (elOri === MINE ? (
          <Text>💣</Text>
        ) : (
          <Text style={el === 0 && { opacity: 0 }}>{el}</Text>
        ))}
    </Pressable>
  );
}

