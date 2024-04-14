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

type CustomInputPropsType = {
  isWidth: boolean;
  isActive: boolean;
};

export default function CustomInput({
  isWidth,
  isActive,
}: CustomInputPropsType): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  const onPressMinus = () => {
    if (isActive) {
      if (isWidth) {
        if (setting.width - 1 > 4) {
          setSetting({ ...setting, width: setting.width - 1 });
        } else {
          Alert.alert('✋ 잠깐!', '\n가로는 5보다 작게 설정할 수 없습니다.', [
            { text: '확인' },
          ]);
        }
      } else {
        if (setting.height - 1 > 4) {
          setSetting({ ...setting, height: setting.height - 1 });
        } else {
          Alert.alert('✋ 잠깐!', '\n세로는 5보다 작게 설정할 수 없습니다.', [
            { text: '확인' },
          ]);
        }
      }
    }
  };

  const onPressPlus = () => {
    if (isActive) {
      if (isWidth) {
        if (setting.width + 1 < 15) {
          setSetting({ ...setting, width: setting.width + 1 });
        } else {
          Alert.alert('✋ 잠깐!', '\n가로는 14보다 크게 설정할 수 없습니다.', [
            { text: '확인' },
          ]);
        }
      } else {
        if (setting.height + 1 < 33) {
          setSetting({ ...setting, height: setting.height + 1 });
        } else {
          Alert.alert('✋ 잠깐!', '\n세로는 32보다 크게 설정할 수 없습니다.', [
            { text: '확인' },
          ]);
        }
      }
    }
  };

  return (
    <NumberInput
      onPressMinus={onPressMinus}
      onPressPlus={onPressPlus}
      value={
        !isActive
          ? isWidth
            ? 10
            : 18
          : isWidth
          ? setting.width
          : setting.height
      }
      minusFontSize={15}
      plusFontSize={12}
      buttonSize={23}
      numberFontSize={18}
      width={33}
      gap={5}
      isActive={isActive}
    />
  );
}

