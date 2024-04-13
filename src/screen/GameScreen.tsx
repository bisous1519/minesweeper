import { Pressable, StyleSheet, Text, View } from 'react-native';
import RootView from '../components/RootView';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { SettingType } from '../atoms/atomType';
import { settingState } from '../atoms/atoms';
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

  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [leftMines, setLeftMines] = useState<number>(0);
  const [tictoc, setTictoc] = useState<number>(0);

  const onPressSmile = () => {
    setIsBottomOpen((prev) => !prev);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLeftMines(setting.mines);
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
            <Text style={styles.headerNumber}>{leftMines}</Text>
          </View>
          <Pressable style={styles.smileWrapper} onPress={onPressSmile}>
            <Text style={styles.smile}>🙂</Text>
            {/* onPressIn일때 놀라고 out일때 돌아옴, 지뢰면 삐죽 */}
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

