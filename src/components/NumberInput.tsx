import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { SettingType } from '../atoms/atomType';
import { settingState } from '../atoms/atoms';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f4e0e0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    // backgroundColor: 'pink',
    textAlign: 'center',
  },
});

type NumberInputPropsType = {
  onPressMinus: () => void;
  onPressPlus: () => void;
  buttonSize?: number;
  minusFontSize?: number;
  plusFontSize?: number;
  numberFontSize?: number;
  gap?: number;
  width?: number;
  value: number;
  isActive?: boolean;
};

export default function NumberInput({
  onPressMinus,
  onPressPlus,
  buttonSize = 38,
  minusFontSize = 30,
  plusFontSize = 25,
  numberFontSize = 23,
  gap = 12,
  width = 55,
  value,
  isActive = true,
}: NumberInputPropsType): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  return (
    <View style={[styles.container, { gap }]}>
      <Pressable
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize },
          !isActive && { backgroundColor: '#dfdddd' },
        ]}
        onPress={onPressMinus}
      >
        <AntDesign name='minus' size={minusFontSize} color='black' />
      </Pressable>
      <Text
        style={[
          styles.value,
          { fontSize: numberFontSize, width },
          !isActive && { color: '#808080' },
        ]}
      >
        {value}
      </Text>
      <Pressable
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize },
          !isActive && { backgroundColor: '#dfdddd' },
        ]}
        onPress={onPressPlus}
      >
        <AntDesign name='plus' size={plusFontSize} color='black' />
      </Pressable>
    </View>
  );
}

