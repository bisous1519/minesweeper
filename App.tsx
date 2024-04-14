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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Dimensions } from 'react-native';

// export const calSize = (size: number): number => {
//   return (size * Dimensions.get('window').width) / 375;
// };

const Tab = createBottomTabNavigator();

type RootTabParamList = {
  main: undefined;
  game: undefined;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>;

export default function App() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='main'
            screenOptions={{ headerShown: false }}
            tabBar={() => null}
          >
            <Tab.Screen
              name='main'
              component={MainScreen}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name='game'
              component={GameScreen}
              options={{ unmountOnBlur: true }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
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

