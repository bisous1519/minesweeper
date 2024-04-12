import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import RootView from '../components/RootView';
import StartButton from '../components/StartButton';
import { LvType, SettingType } from '../atoms/atomType';
import RadioInput from '../components/RadioInput';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/atoms';
import MinesInput from '../components/MinesInput';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 80,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    marginBottom: 40,
  },
  title1: {
    fontSize: 50,
  },
  title2: {
    textAlign: 'right',
    fontSize: 50,
  },
  eachView: {
    marginBottom: 35,
    // alignItems: 'center',
  },
  subject: {
    fontSize: 27,
    marginBottom: 20,
  },
  lvsWrapper: {
    gap: 15,
  },
  buttonWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
});

const lvs: LvType[] = ['Beginner', 'Intermediate', 'Expert'];

export default function MainScreen(): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);

  return (
    <RootView propsStyles={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title1}>Mine🚩</Text>
        <Text style={styles.title2}>sweeper</Text>
      </View>
      <View style={styles.eachView}>
        <Text style={styles.subject}>Level</Text>
        <FlatList
          contentContainerStyle={styles.lvsWrapper}
          data={lvs}
          renderItem={({ item }) => <RadioInput curLv={item} />}
        />
      </View>
      <View style={styles.eachView}>
        <Text style={styles.subject}>Mines</Text>
        <MinesInput />
      </View>
      <View style={styles.buttonWrapper}>
        <StartButton />
      </View>
    </RootView>
  );
}

