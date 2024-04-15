import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootTabNavigationProp } from '../../App';
import getSize from '../utils/getSize';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FF4B4D',
    paddingVertical: 15,
    // paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  text: {
    // fontSize: 27,
    fontSize: getSize(27),
    color: '#fff',
  },
});

export default function StartButton({
  width,
}: {
  width: number;
}): React.JSX.Element {
  const navigation = useNavigation<RootTabNavigationProp>();

  const onPressStart = () => {
    navigation.navigate('game');
  };

  return (
    <Pressable onPress={onPressStart} style={[styles.wrapper, { width }]}>
      <Text style={styles.text}>START</Text>
    </Pressable>
  );
}

