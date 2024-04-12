import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screen/MainScreen';
import GameScreen from './src/screen/GameScreen';

const Tab = createBottomTabNavigator();

type RootTabParamList = {
  main: undefined;
  game: undefined;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function App() {
  return (
    <RecoilRoot>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='main'
          screenOptions={{ headerShown: false }}
          tabBar={() => null}
        >
          <Tab.Screen name='main' component={MainScreen} />
          <Tab.Screen name='game' component={GameScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

