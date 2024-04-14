export type SettingType = {
  lv: LvType;
  width: number;
  height: number;
  mines: number;
};

export type CurStatusType = {
  status: 'READY' | 'START' | 'OVER' | 'SUCCESS';
  leftCell: number;
  flags: number;
  isFlagMode: boolean;
};

export type LvType = 'Beginner' | 'Intermediate' | 'Expert';

