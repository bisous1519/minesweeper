import { Text, View } from 'react-native';
import RootView from '../components/RootView';
import { useNavigation } from '@react-navigation/native';

export default function GameScreen(): React.JSX.Element {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <RootView>
      <Text>game!</Text>
    </RootView>
  );
}

