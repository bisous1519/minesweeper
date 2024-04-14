import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import CellButton from './CellButton';
import { useRecoilState } from 'recoil';
import { CurStatusType, SettingType } from '../atoms/atomType';
import { curStatusState, settingState } from '../atoms/atoms';

const tableStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 4,
    // borderLeftWidth: 4,
    // borderColor: '#000',
    // backgroundColor: 'orange',
  },
  row: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type GameContainerPropsType = {};

export default function GameContainer({}: GameContainerPropsType): React.JSX.Element {
  const MINE = -1;
  const FLAG = -2;
  const WRONG = -3;
  const dr = [-1, -1, 0, 1, 1, 1, 0, -1]; // 상 상우 우 우하 하 하좌 좌 좌상
  const dc = [0, 1, 1, 1, 0, -1, -1, -1];

  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);
  //   const settingW = useMemo(() => setting.width, [setting.width]);
  //   const settingH = useMemo(() => setting.height, [setting.height]);

  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [board, setBoard] = useState<number[][]>();
  const [boardOri, setBoardOri] = useState<number[][]>();
  const [boardTF, setBoardTF] = useState<boolean[][]>();
  const [finTrigger, setFinTrigger] = useState<{ r: number; c: number }>();

  const onPressMine = (r: number, c: number) => {
    setCurStatus({ ...curStatus, status: 'OVER' });
    setFinTrigger({ r, c });

    // 모든 mine 자리 누르기, flag 잘못세운데 x하기
    if (boardOri && boardTF && board) {
      boardOri.forEach((row, r) =>
        row.forEach((ori, c) => {
          if (board[r][c] === FLAG && ori !== MINE) {
            board[r][c] = WRONG;
          } else if (board[r][c] !== FLAG && ori === MINE) {
            boardTF[r][c] = true;
          }
        })
      );
      setBoard(board.map((row) => [...row]));
      setBoardTF(boardTF.map((row) => [...row]));
    }
  };

  const onLongPressCell = (r: number, c: number) => {
    if (board) {
      // 플래그 세우기
      if (board[r][c] !== FLAG) {
        // flag모드
        if (!curStatus.isFlagMode) {
          setCurStatus({ ...curStatus, isFlagMode: true });
        }

        board[r][c] = FLAG;
        setBoard(board.map((row) => [...row]));
        setCurStatus({
          ...curStatus,
          flags: curStatus.flags + 1,
          leftCell: curStatus.leftCell - 1,
        });
      }

      // 플래그 빼기
      else if (boardOri) {
        board[r][c] = boardOri[r][c];
        setBoard(board.map((row) => [...row]));
        setCurStatus({
          ...curStatus,
          flags: curStatus.flags - 1,
          leftCell: curStatus.leftCell + 1,
        });
      }
    }
  };

  const onPressCell = (r: number, c: number) => {
    if (
      !boardTF ||
      !board ||
      curStatus.status === 'OVER' ||
      curStatus.status === 'SUCCESS'
    )
      return;

    // 이미 열린 곳
    if (boardTF[r][c]) return;

    // 플래그 세운 곳
    if (board[r][c] === FLAG) return;

    // 지뢰 밟음
    if (board[r][c] === MINE) {
      onPressMine(r, c);
      return;
    }

    // 빈셀은 아님! 바로 숫자 => 얘만 열기
    if (board[r][c] !== 0) {
      boardTF[r][c] = true;
      setBoardTF(boardTF.map((row) => [...row]));
      setCurStatus({ ...curStatus, leftCell: curStatus.leftCell - 1 });
      return;
    }

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

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const isIn = useCallback((r: number, c: number) => {
    return 0 <= r && r < setting.width && 0 <= c && c < setting.height;
  }, []);

  useEffect(() => {
    if (curStatus.status === 'SUCCESS') {
      board?.forEach((row, r) => {
        row.forEach((el, c) => {
          if (el === MINE) {
            board[r][c] = FLAG;
          }
        });
      });
      setBoard(board?.map((row) => [...row]));
    }
  }, [curStatus.status]);

  // 게임 초기세팅
  useEffect(() => {
    // mines 위치 결정
    const { mines, width, height } = setting;
    let minesLoc = [];
    let tempMap = new Array(width)
      .fill(null)
      .map(() => new Array(height).fill(0));

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
  }, []);
  useEffect(() => {
    console.log('board', board?.map((row) => row.join(' ')).join('\n'));
  }, [board]);

  return (
    <View style={styles.container} onLayout={onLayoutContainer}>
      <Table style={tableStyles.container}>
        {board &&
          boardTF &&
          boardOri &&
          board.map((row, rIdx) => (
            <TableWrapper key={rIdx} style={tableStyles.row}>
              {row.map((el, cIdx) => (
                <Cell
                  key={cIdx}
                  style={
                    {
                      // width: containerSize.width / 8,
                      // height: containerSize.height / 8,
                    }
                  }
                  data={
                    <CellButton
                      el={el}
                      rIdx={rIdx}
                      cIdx={cIdx}
                      onPressCell={onPressCell}
                      onLongPressCell={onLongPressCell}
                      isPressed={boardTF[rIdx][cIdx]}
                      finTrigger={finTrigger}
                      elOri={boardOri[rIdx][cIdx]}
                    />
                  }
                />
              ))}
            </TableWrapper>
          ))}
      </Table>
    </View>
  );
}

/**
 * 0. 초기세팅 :
 *    1. board[][] 생성.fill(0) (8 * 8, mines : 10개)
 *    2. 랜덤으로 mines 위치 결정 -> mindsLoc에 push, Map에 표시(-1)
 *    3. minesLoc 돌면서 8방에 -1아닌곳(mines 아닌곳)에 ++
 * 1. 게임시작 :
 *    - 사용자가 길게 클릭 -> 플래그 (-2)
 *    - 사용자가 클릭 ->
 *      - (첫 클릭시 타임시작)
 *      - 플래그는 안눌림
 *      - 지뢰면 게임 끝
 *      - 숫자를 클릭 -> 걔만 엶
 *      - 빈칸 클릭 -> 빈칸 ~ 숫자가 나올때까지 다 엶
 * >> 테이블 상에서 좌표를 어떻게 구할 것인가?
 *    : FlatList 사용 vs. react-native-table-component 라이브러리 활용
 *    => 2차원 배열을 가지고 직관적으로 핸들링 할 수 있는 라이브러리가 더 좋겠다!
 */

