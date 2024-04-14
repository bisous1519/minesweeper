import {
  FlatList,
  Pressable,
  Settings,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RootView from '../components/RootView';
import StartButton from '../components/StartButton';
import { CurStatusType, LvType, SettingType } from '../atoms/atomType';
import RadioInput from '../components/RadioInput';
import { useRecoilState } from 'recoil';
import {
  settingState,
  settingInitial,
  curStatusState,
  curStatusInitial,
} from '../atoms/atoms';
import MinesInput from '../components/MinesInput';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  titleWrapper: {
    marginBottom: 40,
    marginHorizontal: 25,
  },
  title1: {
    fontSize: 50,
  },
  title2: {
    textAlign: 'right',
    fontSize: 50,
  },
  eachView: {
    marginBottom: 25,
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

export const lvs: LvType[] = ['Beginner', 'Intermediate', 'Expert', 'Custom'];
const lvsSize: string[] = ['(8x8)', '(10x14)', '(14x32)', ''];

export default function MainScreen(): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);

  const onPressLv = (curLv: LvType) => {
    if (curLv === 'Beginner') {
      setSetting({ lv: curLv, width: 8, height: 8, mines: 10 });
    } else if (curLv === 'Intermediate') {
      setSetting({ lv: curLv, width: 10, height: 14, mines: 20 });
    } else if (curLv === 'Expert') {
      setSetting({ lv: curLv, width: 14, height: 32, mines: 40 });
    } else {
      setSetting({ lv: curLv, width: 10, height: 18, mines: 5 });
    }
  };

  useEffect(() => {
    setSetting({ ...settingInitial });
    setCurStatus({ ...curStatusInitial });
  }, []);
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
          renderItem={({ item, index }) => (
            <RadioInput
              onPressLv={onPressLv}
              curLv={item}
              size={lvsSize[index]}
            />
          )}
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

