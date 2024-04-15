import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { CurStatusType, SettingType } from '../atoms/atomType';
import { curStatusState, settingState } from '../atoms/atoms';

export type UseBoardReturnType = {
  board: number[][] | undefined;
  setBoard: Dispatch<SetStateAction<number[][] | undefined>>;
  boardOri: number[][] | undefined;
  setBoardOri: Dispatch<SetStateAction<number[][] | undefined>>;
  boardTF: boolean[][] | undefined;
  setBoardTF: Dispatch<SetStateAction<boolean[][] | undefined>>;
  newBoard: () => void;
  boardBfs: (r: number, c: number) => void;
};
export default function useBoard(): UseBoardReturnType {
  const MINE = -1;
  const FLAG = -2;
  const WRONG = -3;
  const dr = [-1, -1, 0, 1, 1, 1, 0, -1]; // 상 상우 우 우하 하 하좌 좌 좌상
  const dc = [0, 1, 1, 1, 0, -1, -1, -1];

  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);

  const [board, setBoard] = useState<number[][]>();
  const [boardOri, setBoardOri] = useState<number[][]>();
  const [boardTF, setBoardTF] = useState<boolean[][]>();

  const isIn = useCallback((r: number, c: number) => {
    return 0 <= r && r < setting.width && 0 <= c && c < setting.height;
  }, []);

  const boardBfs = (r: number, c: number) => {
    if (!board || !boardTF) return;

    // 빈셀! 0임!! => 인접칸 열기
    let queue = [[r, c]];
    let isVisited = boardTF;
    isVisited[r][c] = true;
    let tempLeftCell = curStatus.leftCell - 1;

    let qIdx = 0;
    while (qIdx < queue.length) {
      let size = queue.length - qIdx;
      while (size-- > 0) {
        const [r, c] = queue[qIdx++];

        for (let d = 0; d < 8; d++) {
          const goR = r + dr[d];
          const goC = c + dc[d];

          if (!isIn(goR, goC)) continue;
          if (isVisited[goR][goC]) continue;
          if (board[goR][goC] === MINE) continue;
          if (board[goR][goC] === FLAG) continue;

          isVisited[goR][goC] = true;
          tempLeftCell--;
          if (board[goR][goC] === 0) {
            queue.push([goR, goC]);
          }
        }
      }
    }

    setBoardTF(isVisited.map((row) => [...row]));
    setCurStatus({ ...curStatus, leftCell: tempLeftCell });
  };

  // 게임 초기세팅
  const newBoard = () => {
    const { mines, width, height } = setting;
    let minesLoc = [];
    let tempMap = new Array(width)
      .fill(null)
      .map(() => new Array(height).fill(0));

    // mines 위치 결정
    for (let i = 0; i < mines; i++) {
      while (true) {
        const r = Math.floor(Math.random() * width);
        const c = Math.floor(Math.random() * height);

        if (tempMap[r][c] !== MINE) {
          minesLoc.push([r, c]); // 위치 저장
          tempMap[r][c] = MINE; // map에도 저장
          break;
        }
      }
    }
    console.log('minesLoc', minesLoc);

    // board 완성
    minesLoc.forEach((row) => {
      const [r, c] = row;
      for (let d = 0; d < 8; d++) {
        const goR = r + dr[d];
        const goC = c + dc[d];

        if (!isIn(goR, goC)) continue;
        if (tempMap[goR][goC] === MINE) continue;
        tempMap[goR][goC]++;
      }
    });

    // board에 복제
    setBoard(tempMap.map((row) => [...row]));
    setBoardOri(tempMap.map((row) => [...row]));
    setBoardTF(
      new Array(width).fill(null).map(() => new Array(height).fill(false))
    );
  };
  useEffect(() => {
    console.log('board', board?.map((row) => row.join(' ')).join('\n'));
  }, [board]);

  return {
    board,
    setBoard,
    boardOri,
    setBoardOri,
    boardTF,
    setBoardTF,
    newBoard,
    boardBfs,
  };
}

