import { atom } from 'recoil';
import { CurStatusType, SettingType } from './atomType';

export const settingInitial: SettingType = {
  lv: 'Beginner',
  width: 8,
  height: 8,
  mines: 10,
};

export const curStatusInitial: CurStatusType = {
  status: 'READY',
  leftCell: 64,
  flags: 0,
  isFlagMode: false,
};

export const curStatusState = atom<CurStatusType>({
  key: 'curStatusState',
  default: curStatusInitial,
});

export const settingState = atom<SettingType>({
  key: 'settingState',
  default: settingInitial, // 10, 20, 40
});

