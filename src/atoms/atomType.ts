export type SettingType = {
  lv: LvType;
  width: number;
  height: number;
  mines: number;
};

export type LvType = 'Beginner' | 'Intermediate' | 'Expert';

export type StatusType = 'READY' | 'START' | 'OVER' | 'SUCCESS';

