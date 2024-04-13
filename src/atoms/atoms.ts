import { atom } from 'recoil';
import { SettingType } from './atomType';

export const settingInitial: SettingType = {
  lv: 'Beginner',
  width: 8,
  height: 8,
  mines: 10,
};

export const settingState = atom<SettingType>({
  key: 'settingState',
  default: settingInitial, // 10, 20, 40
});
