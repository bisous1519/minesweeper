import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LvType, SettingType } from '../atoms/atomType';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/atoms';
import { useEffect, useState } from 'react';
import CustomInput from './CustomInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    // backgroundColor: 'pink',
  },
  fingerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finger: {
    fontSize: 23,
  },
  levelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  level: {
    fontSize: 23,
  },
  levelSize: {
    fontSize: 18,
    color: '#a0a0a0',
  },
  customLevelSize: {
    fontSize: 18,
    color: '#000',
  },
  customContainer: {
    marginTop: 4,
    gap: 10,
  },
  customWrapper: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  customInput: {
    borderBottomWidth: 1,
    // borderColor: '#f4e0e0',
    borderColor: '#fbabab',
    width: 20,
    textAlign: 'center',
  },
  customText: {
    fontSize: 14,
    color: '#757575',
  },
});

type RadioInputPropsType = {
  curLv: LvType;
  size: string;
  onPressLv: (curLv: LvType) => void;
};

export default function RadioInput({
  curLv,
  size,
  onPressLv,
}: RadioInputPropsType): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  const [isOn, setIsOn] = useState<boolean>(false);

  useEffect(() => {
    if (setting.lv === curLv) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [setting]);

  return (
    <View style={styles.container}>
      <View style={styles.fingerWrapper}>
        <Text style={[styles.finger, !isOn && { opacity: 0 }]}>👉</Text>
      </View>
      <Pressable
        style={[
          styles.levelWrapper,
          curLv === 'Custom' && { alignItems: 'flex-start' },
        ]}
        onPress={() => onPressLv(curLv)}
      >
        <Text style={styles.level}>{curLv}</Text>
        <Text style={styles.levelSize}>{size}</Text>
        {curLv === 'Custom' && (
          // {curLv === 'Custom' && isOn && (
          <View style={styles.customContainer}>
            <View style={styles.customWrapper}>
              <Text style={styles.customText}>가로 : </Text>
              <CustomInput isWidth={true} isActive={setting.lv === 'Custom'} />
            </View>
            <View style={styles.customWrapper}>
              <Text style={styles.customText}>세로 : </Text>
              <CustomInput isWidth={false} isActive={setting.lv === 'Custom'} />
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

