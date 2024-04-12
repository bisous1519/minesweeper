import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { SettingType } from '../atoms/atomType';
import { settingState } from '../atoms/atoms';
import { AntDesign } from '@expo/vector-icons';

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
    backgroundColor: '#f7e1e5',
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
    setSetting({ ...setting, mines: setting.mines - 1 });
  };

  const onPressPlus = () => {
    setSetting({ ...setting, mines: setting.mines + 1 });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPressMinus}>
        <AntDesign name='minus' size={30} color='black' />
      </Pressable>
      <Text style={styles.value}>{setting.mines}</Text>
      <Pressable style={styles.button} onPress={onPressPlus}>
        <AntDesign name='plus' size={25} color='black' />
      </Pressable>
    </View>
  );
}

