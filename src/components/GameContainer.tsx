import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import CellButton from './CellButton';
import { useRecoilState } from 'recoil';
import { CurStatusType, SettingType } from '../atoms/atomType';
import { curStatusState, settingState } from '../atoms/atoms';
import useBoard from '../hooks/useBoard';

const tableStyles = StyleSheet.create({
  container: {
    // flex: 1,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderTopColor: '#b0b0b0',
    borderLeftColor: '#b0b0b0',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    // backgroundColor: 'orange',
  },
  row: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
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

  const [setting, setSetting] = useRecoilState<SettingType>(settingState);
  const [curStatus, setCurStatus] =
    useRecoilState<CurStatusType>(curStatusState);
  const {
    board,
    setBoard,
    boardOri,
    setBoardOri,
    boardTF,
    setBoardTF,
    boardBfs,
    newBoard,
  } = useBoard();
  const [cellSize, setCellSize] = useState<number>(40);
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
        board[r][c] = FLAG;
        setBoard(board.map((row) => [...row]));
        setCurStatus({
          ...curStatus,
          flags: curStatus.flags + 1,
          leftCell: curStatus.leftCell - 1,
          isFlagMode: true,
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
    boardBfs(r, c);
  };

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    console.log('!!!! Layout', width, height);

    setCellSize(
      Math.min(
        Math.floor(width / setting.height),
        Math.floor(height / setting.width)
      )
    );
  };

  // 성공일 때, FLAG 안꽂은 자리에 다 꽂아서 보여주기
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
    newBoard();
  }, []);

  return (
    <View
      style={styles.container}
      collapsable={false}
      onLayout={onLayoutContainer}
    >
      <View style={tableStyles.container}>
        <Table>
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
                        size={cellSize}
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

