import {
  FlatList,
  Pressable,
  Settings,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutChangeEvent,
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
import { useEffect, useState } from 'react';
// import { calSize } from '../../App';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  titleWrapper: {
    marginBottom: 40,
  },
  title1: {
    fontSize: 50,
    transform: [{ translateX: 70 }],
  },
  title2: {
    fontSize: 50,
    textAlign: 'right',
    transform: [{ translateX: -70 }],
  },
  eachViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    alignItems: 'center',
    // flexDirection: 'row',
  },
});

export const lvs: LvType[] = ['Beginner', 'Intermediate', 'Expert', 'Custom'];
const lvsSize: string[] = ['(8x8)', '(10x14)', '(14x32)', ''];

export default function MainScreen(): React.JSX.Element {
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);

  const [eachViewW, setEachViewW] = useState<number>(0);

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

  const onLayoutFirstEachView = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    console.log('??', width);
    setEachViewW(width);
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
      <View style={styles.eachViewWrapper}>
        <View style={styles.eachView} onLayout={onLayoutFirstEachView}>
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
      </View>
      <View style={styles.eachViewWrapper}>
        <View style={[styles.eachView, { width: eachViewW }]}>
          <Text style={styles.subject}>Mines</Text>
          <MinesInput />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <StartButton width={eachViewW} />
      </View>
    </RootView>
  );
}

