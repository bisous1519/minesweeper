import { Dimensions, PixelRatio } from 'react-native';

const getFontSizeWithPixelRatio = (size: number): number =>
  size / PixelRatio.getFontScale();

const getSize = (size: number): number =>
  (Dimensions.get('window').width / 375) * size;

export default getSize;

