import { RefObject, useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';

const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    // backgroundColor: 'orange',
  },
  row: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  el: {
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
  },
});

export default function GameContainer(): React.JSX.Element {
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [gameArr, setGameArr] = useState(
    new Array(8).fill(null).map(() => new Array(8).fill(0))
  );

  const onPressCell = (el: number, rIdx: number, cIdx: number) => {
    alert(`${el} (${rIdx}, ${cIdx})`);
  };

  const onLayoutContainer = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const cell = (el: number, rIdx: number, cIdx: number): React.JSX.Element => (
    <Pressable onPress={() => onPressCell(el, rIdx, cIdx)}>
      <Text>{el}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container} onLayout={onLayoutContainer}>
      <Table style={tableStyles.container}>
        {gameArr.map((row, rIdx) => (
          <TableWrapper key={rIdx} style={tableStyles.row}>
            {row.map((el, cIdx) => (
              <Cell
                key={cIdx}
                style={[
                  tableStyles.el,
                  {
                    // width: containerSize.width / 8,
                    // height: containerSize.height / 8,
                  },
                ]}
                data={cell(el, rIdx, cIdx)}
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
 *    1. Map[][] 생성.fill(0) (8 * 8, mines : 10개)
 *    2. 랜덤으로 mines 위치 결정 -> mindsLoc에 push, Map에 표시(-1)
 *    3. minesLoc 돌면서 8방에 -1아닌곳(mines 아닌곳)에 ++
 * 1. 게임시작 :
 *    - 사용자가 길게 클릭 -> 플래그 (-2)
 *    - 사용자가 클릭 ->
 *      - (첫 클릭시 타임시작)
 *      - 지뢰면 게임 끝
 *      - 숫자를 클릭 -> 걔만 엶
 *      - 빈칸 클릭 -> 빈칸 ~ 숫자가 나올때까지 다 엶
 * >> 테이블 상에서 좌표를 어떻게 구할 것인가?
 *    : FlatList 사용 vs. react-native-table-component 라이브러리 활용
 *    => 2차원 배열을 가지고 직관적으로 핸들링 할 수 있는 라이브러리가 더 좋겠다!
 */

