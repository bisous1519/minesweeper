import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
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
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 5,
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
    navigation.goBack();
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

    return () => clearInterval(timer);
  }, [curStatus.status]);

  useEffect(() => {
    // 셀 하나 클릭하면 시작!
    if (curStatus.leftCell !== setting.width * setting.height) {
      setCurStatus({ ...curStatus, status: 'START' });
    }

    // 성공!
    if (curStatus.leftCell + curStatus.flags === setting.mines) {
      Alert.alert('🎉 축하합니다!', `\n걸린 시간 : ${tictoc}s`, [
        { text: '확인' },
      ]);
      setCurStatus({ ...curStatus, status: 'SUCCESS' });
    }
  }, [curStatus.leftCell]);

  useEffect(() => {
    setTictoc(0);
    setCurStatus({
      status: 'READY',
      leftCell: setting.width * setting.height,
      flags: 0,
      isFlagMode: false,
    });
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
          {/* Todo: 진짜 뒤로가? */}
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
            {/* Todo: onPressIn일때 놀라고 out일때 돌아옴, 지뢰면 삐죽 */}
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
      {/* Todo: 다시시작하기나 다른 난이도 클릭햇을때 진짜? */}
      {/* Todo:  */}
    </RootView>
  );
}

