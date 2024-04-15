import { Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { SettingType } from '../atoms/atomType';
import { settingState } from '../atoms/atoms';
import NumberInput from './NumberInput';
import getSize from '../utils/getSize';

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
      minusFontSize={getSize(15)}
      plusFontSize={getSize(12)}
      buttonSize={getSize(23)}
      numberFontSize={getSize(18)}
      width={getSize(33)}
      gap={getSize(5)}
      isActive={isActive}
    />
  );
}

