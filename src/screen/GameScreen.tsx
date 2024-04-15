import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RootView from '../components/RootView';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { CurStatusType, SettingType } from '../atoms/atomType';
import { curStatusState, settingState } from '../atoms/atoms';
import GameContainer from '../components/GameContainer';
import SmileBottomSheet from '../components/SmileBottomSheet';

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#b0b0b0',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        borderBottomWidth: 4,
        borderBottomColor: '#b0b0b0',
      },
    }),
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 65,
  },
  smileWrapper: {},
  smile: {
    fontSize: 35,
  },
  headerNumberWrapper: {
    // backgroundColor: 'pink',
    width: 85,
  },
  headerNumber: {
    fontSize: 35,
  },
});

export default function GameScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);

  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [tictoc, setTictoc] = useState<number>(0);

  const onPressSmile = () => {
    setIsBottomOpen((prev) => !prev);
  };

  const onPressBack = () => {
    Alert.alert('✋ 잠깐!', '\n정말 게임을 끝내시겠습니까?', [
      { text: '취소' },
      {
        text: '나가기',
        style: 'destructive',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  // 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (curStatus.status === 'START') {
      timer = setInterval(() => {
        setTictoc((prev) => prev + 1);
        if (curStatus.status !== 'START') {
          clearInterval(timer);
        }
      }, 1000);
    }

    // 실패!ㅠ
    else if (curStatus.status === 'OVER') {
      Alert.alert('💣 실패', `\n걸린 시간 : ${tictoc}s`, [{ text: '확인' }]);
    }

    return () => clearInterval(timer);
  }, [curStatus.status]);

  useEffect(() => {
    // 셀 하나 클릭하면 시작!
    if (curStatus.leftCell !== setting.width * setting.height) {
      setCurStatus({ ...curStatus, status: 'START' });
    }

    // 성공!
    if (
      curStatus.status === 'START' &&
      curStatus.leftCell + curStatus.flags === setting.mines
    ) {
      Alert.alert(
        '🎉 축하합니다!',
        `\n모드 : ${
          curStatus.isFlagMode ? 'flag mode' : 'non-flag mode'
        }\n걸린 시간 : ${tictoc}s`,
        [{ text: '확인' }]
      );
      setCurStatus({ ...curStatus, status: 'SUCCESS' });
    }
  }, [curStatus.leftCell]);

  useEffect(() => {
    console.log('!!! gameScreen useEffect');
    setTictoc(0);
    setCurStatus({
      status: 'READY',
      leftCell: setting.width * setting.height,
      flags: 0,
      isFlagMode: false,
    });
    console.log('!!!!!!', setting.width, setting.height);
  }, []);
  return (
    <RootView>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={onPressBack}>
          <MaterialCommunityIcons
            name='arrow-u-left-top'
            size={30}
            color='#808080'
          />
        </Pressable>
        <View style={styles.header}>
          <View style={styles.headerNumberWrapper}>
            <Text style={styles.headerNumber}>
              {setting.mines - curStatus.flags}
            </Text>
          </View>
          <Pressable style={styles.smileWrapper} onPress={onPressSmile}>
            <Text style={styles.smile}>
              {curStatus.status === 'OVER'
                ? '😵'
                : curStatus.status === 'SUCCESS'
                ? '🥳'
                : '🙂'}
            </Text>
          </Pressable>
          <View style={styles.headerNumberWrapper}>
            <Text style={[styles.headerNumber, { textAlign: 'right' }]}>
              {tictoc}
            </Text>
          </View>
        </View>
      </View>
      <GameContainer />
      {isBottomOpen && <SmileBottomSheet setIsBottomOpen={setIsBottomOpen} />}
    </RootView>
  );
}

