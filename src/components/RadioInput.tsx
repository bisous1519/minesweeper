import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LvType, SettingType } from '../atoms/atomType';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/atoms';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: 23,
  },
});

type RadioInputPropsType = {
  curLv: LvType;
};

export default function RadioInput({
  curLv,
}: RadioInputPropsType): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  const [isOn, setIsOn] = useState<boolean>(false);

  const onPressLv = () => {
    setSetting({
      lv: curLv,
      mines: curLv === 'Beginner' ? 10 : curLv === 'Intermediate' ? 20 : 40,
    });
  };

  useEffect(() => {
    if (setting.lv === curLv) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [setting]);

  return (
    <Pressable style={styles.container} onPress={onPressLv}>
      <MaterialIcons
        name={isOn ? 'radio-button-on' : 'radio-button-off'}
        size={24}
        color='black'
      />
      <Text style={styles.text}>{curLv}</Text>
    </Pressable>
  );
}

