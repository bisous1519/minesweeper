import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { lvs } from '../screen/MainScreen';
import { LvType, SettingType } from '../atoms/atomType';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/atoms';

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
  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const sheetRef = useRef<BottomSheet>(null);

  const onPressEl = (text: string) => {
    if (text === '다시 시작하기') {
      setSetting({ ...setting });
    } else {
      setSetting({
        lv: text as LvType,
        mines: text === 'Beginner' ? 10 : text === 'Intermediate' ? 20 : 40,
      });
    }
    setIsBottomOpen(false);
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

