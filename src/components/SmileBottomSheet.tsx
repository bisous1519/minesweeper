import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { lvs } from '../screen/MainScreen';
import { CurStatusType, LvType, SettingType } from '../atoms/atomType';
import { useRecoilState } from 'recoil';
import { curStatusState, settingState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
import { RootTabNavigationProp } from '../../App';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'orange',
  },
  wrapper: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 23,
    textAlign: 'center',
  },
});

const data: string[] = ['다시 시작하기', ...lvs];

type SmileBottomSheetPropsType = {
  setIsBottomOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SmileBottomSheet({
  setIsBottomOpen,
}: SmileBottomSheetPropsType): React.JSX.Element {
  const navigation = useNavigation<RootTabNavigationProp>();

  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);
  const sheetRef = useRef<BottomSheet>(null);

  const onPressEl = (text: string) => {
    const onPressYes = () => {
      setCurStatus({ ...curStatus, status: 'READY' });

      if (text !== '다시 시작하기') {
        setSetting({
          lv: text as LvType,
          width: text === 'Beginner' ? 8 : text === 'Intermediate' ? 10 : 14,
          height: text === 'Beginner' ? 8 : text === 'Intermediate' ? 14 : 32,
          mines: text === 'Beginner' ? 10 : text === 'Intermediate' ? 20 : 40,
        });
      }

      setIsBottomOpen(false);
      console.log('!! game으로 이동!');
      navigation.reset({ routes: [{ name: 'game' }] });
    };

    if (text === '다시 시작하기') {
      Alert.alert('✋ 잠깐!', '정말로 다시 시작할까요?', [
        { text: '아니요' },
        { text: '네', style: 'destructive', onPress: () => onPressYes() },
      ]);
    } else {
      Alert.alert('✋ 잠깐!', '난이도를 변경하고 새로 시작할까요?', [
        { text: '아니요' },
        { text: '네', style: 'destructive', onPress: () => onPressYes() },
      ]);
    }
  };

  //   const renderbackdrop = useCallback((props) => {
  //     <BottomSheetBackdrop
  //       {...props}
  //       //   animatedIndex={0}
  //       //   animatedPosition={0}
  //       pressBehavior={'close'}
  //     />;
  //   }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['36%']}
      enablePanDownToClose={true}
      onClose={() => setIsBottomOpen(false)}
      //   backdropComponent={renderbackdrop}
    >
      <BottomSheetFlatList
        style={styles.container}
        data={data}
        renderItem={({ item, index }) => (
          <Pressable style={styles.wrapper} onPress={() => onPressEl(item)}>
            <Text style={[styles.text, index === 0 && { color: '#ff6767' }]}>
              {item}
            </Text>
          </Pressable>
        )}
      />
    </BottomSheet>
  );
}

