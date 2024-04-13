import { Pressable, StyleSheet, Text, View } from 'react-native';
import RootView from '../components/RootView';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { SettingType, StatusType } from '../atoms/atomType';
import { settingState, statusState } from '../atoms/atoms';
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
  const [status, setStatus] = useRecoilState<StatusType>(statusState);

  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [tictoc, setTictoc] = useState<number>(0);
  const [leftCell, setLeftCell] = useState<number>(
    setting.width * setting.height
  );

  const onPressSmile = () => {
    setIsBottomOpen((prev) => !prev);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'START') {
      timer = setInterval(() => {
        setTictoc((prev) => prev + 1);
        console.log('in', status);
        if (status !== 'START') {
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (leftCell !== setting.width * setting.height) {
      setStatus('START');
    }

    if (leftCell === 0 && setting.mines === 0) {
      alert(`축하! ${tictoc}s`);
      setStatus('SUCCESS');
    }
  }, [leftCell]);

  useEffect(() => {
    setTictoc(0);
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
            <Text style={styles.headerNumber}>{setting.mines}</Text>
          </View>
          <Pressable style={styles.smileWrapper} onPress={onPressSmile}>
            <Text style={styles.smile}>
              {status === 'OVER' ? '😵' : status === 'SUCCESS' ? '🥳' : '🙂'}
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
      <GameContainer leftCell={leftCell} setLeftCell={setLeftCell} />
      {isBottomOpen && <SmileBottomSheet setIsBottomOpen={setIsBottomOpen} />}
      {/* Todo: 다시시작하기나 다른 난이도 클릭햇을때 진짜? */}
    </RootView>
  );
}

