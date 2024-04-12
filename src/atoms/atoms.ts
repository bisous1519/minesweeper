import { atom } from 'recoil';
import { SettingType } from './atomType';

export const settingState = atom<SettingType>({
  key: 'settingState',
  default: { lv: 'Beginner', mines: 10 }, // 10, 20, 40
});

