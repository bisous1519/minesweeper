import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // backgroundColor: '#F8F8F8',
  },
});

type RootViewPropsType = {
  children: React.ReactNode;
  propsStyles?: StyleProp<ViewStyle>;
};

export default function RootView({
  children,
  propsStyles,
}: RootViewPropsType): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, propsStyles]}>{children}</View>
    </SafeAreaView>
  );
}

