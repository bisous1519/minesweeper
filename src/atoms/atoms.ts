import { atom } from 'recoil';

export const settingState = atom<SettingType>({
  key: 'settingState',
  default: { lv: 'Beginner', mines: 10 }, // 10, 20, 40
});

