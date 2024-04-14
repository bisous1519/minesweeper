import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { SettingType } from '../atoms/atomType';
import { settingState } from '../atoms/atoms';
import { AntDesign } from '@expo/vector-icons';
import NumberInput from './NumberInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  value: {
    fontSize: 23,
  },
  button: {
    backgroundColor: '#f4e0e0',
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MinesInput(): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  const onPressMinus = () => {
    if (setting.mines - 1 > 1) {
      setSetting({ ...setting, mines: setting.mines - 1 });
    } else {
      Alert.alert('✋ 잠깐!', '\n지뢰 개수는 2보다 작게 설정할 수 없습니다.', [
        { text: '확인' },
      ]);
    }
  };

  const onPressPlus = () => {
    if (setting.mines + 1 <= setting.width * setting.height * (1 / 3)) {
      setSetting({ ...setting, mines: setting.mines + 1 });
    } else {
      Alert.alert(
        '✋ 잠깐!',
        '\n지뢰 갯수는 전체 셀 갯수의 1/3 이하로만 설정 가능합니다.',
        [{ text: '확인' }]
      );
    }
  };

  return (
    <NumberInput
      onPressMinus={onPressMinus}
      onPressPlus={onPressPlus}
      value={setting.mines}
    />
  );
}

