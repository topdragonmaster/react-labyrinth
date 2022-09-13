import React, { useState, useEffect, useRef } from "react";

import {
  Section,
  Container,
  Title,
  Header,
  CellBoard,
  Row,
  Footer
} from "./style"
import { Button, Cell, Text, Modal } from '../components'

import levels from '../level.json'
import ball from "../assets/ball.png"
import { ILocation, ResultOption } from "../types";


function Solution() {
  const { matrix, start, end, moves } = levels[0]// import initial value from level 1
  
  const [level, setLevel] = useState(0)
  const [cellMatrix, setMatrix] = useState<number[][]>(matrix)
  const [curLocation, setCurLocation] = useState<ILocation>({ row: start[0], column: start[1] })
  const [movesLeft, setMovesLeft] = useState<number>(moves)
  const [result, setResult] = useState<ResultOption>(ResultOption.PROCESS)
  const [isShown, setIsShown] = useState<boolean>(false); // modal show flag
  const containerRef = useRef(null);


  const moveBall = (moveX: number, moveY: number) => {
    const ROWNUM = cellMatrix.length
    const COLNUM = cellMatrix[0].length
    let nextRow = curLocation.row + moveY
    let nextCol = curLocation.column + moveX
    if (nextCol > COLNUM - 1 || nextCol < 0
        || nextRow > ROWNUM - 1 || nextRow < 0
        || cellMatrix[nextRow][nextCol] === 1
    ) {
      return
    } else {
      setCurLocation({...curLocation, row: nextRow, column: nextCol })
      setMovesLeft(movesLeft-1)
      checkResult(movesLeft - 1, {row: nextRow, column: nextCol})
      return
    }
  }

  /* Check if the user won or lost */
  const checkResult = (movesProp: number, curLocationProp: ILocation) => {
    const { row, column } = curLocationProp
    if (cellMatrix[row][column] === 10) {
      setResult(ResultOption.WON)
      toggle()// display modal
      return
    }
    if (movesProp === 0) {
      setResult(ResultOption.LOST)
      toggle()// display modal
    }
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    
    evt.preventDefault() // prevent scrollbar move when user press arrow keyboard

    if (result === ResultOption.LOST || result === ResultOption.WON) {
      return
    }
    switch (evt.keyCode) {
      case 37:
        moveBall(-1, 0);
        break;
      case 39:
        moveBall(1, 0);
        break;
      case 38:
        moveBall(0, -1);
        break;
      case 40:
        moveBall(0, 1);
        break;
    }
  };

  /* focus on container */
  useEffect(() => {
    containerRef.current.focus()
  }, []);

  const toggle = () => setIsShown(!isShown);
  
  /* modal display content */
  const content = <React.Fragment>{
    result === ResultOption.LOST
      ? 'You Lost'
      : level === 2 
         ? 'You completed all the levels.'
         : 'You won the game.'
      }
  </React.Fragment>;

  const handleRestart = (level: number) => {
    const { matrix, start, moves } = levels[level]
    setLevel(level)
    setMatrix(matrix)
    setCurLocation({ row: start[0], column: start[1] })
    setMovesLeft(moves)
    setResult(ResultOption.PROCESS)
    containerRef.current.focus()
  } 

  const handleNext = () => {
    if (level < 2) {
      const { matrix, start, moves } = levels[level + 1]
      setLevel(level + 1)
      setMatrix(matrix)
      setCurLocation({ row: start[0], column: start[1] })
      setMovesLeft(moves)
      setResult(ResultOption.PROCESS)
      containerRef.current.focus()
    } else {
      return
    }
  }

  return (
    <Section onKeyDown={handleKeyDown} ref={containerRef} tabIndex={0} data-testid="container">
      <Container>
        <Title>Labyrinth</Title>
        <Text color="#6c6464" fontSize={25} style={{marginBottom:"25px"}}> {`LEVEL ${level+1}`} </Text>
        <Header>
          <Button onClick={() => handleRestart(0)}> Restart </Button>
          {level !== 0 && <Button onClick={() => handleRestart(level)}> Restart Level </Button>}
          <Button disabled={result !== ResultOption.WON || level >= 2} onClick={() => handleNext() }> Next level </Button>
        </Header>
        <CellBoard>
          {
            cellMatrix.map((row, i) => {
              return <Row key={i}>
                {
                  row.map((item, j) => {
                    return <Cell
                      key={`key_${i}${j}`}
                      value={item}
                      ball={curLocation.row === i && curLocation.column === j ? ball : null}
                      
                    >{item}
                    </Cell>
                  })
                }
                </Row>
            })
          }
        </CellBoard>
        <Footer>
          <Text
            fontSize={16}
            color={
              result === ResultOption.LOST ? 'red' : 'green'
            }
            data-testid='message'
          >
            {
              result === ResultOption.PROCESS
                ? ''
                : result === ResultOption.LOST
                  ? 'You Lost'
                  : 'You Won'
            }
          </Text>
          <Text fontSize={16} color='black'>Moves left: {movesLeft} </Text>
        </Footer>
        <Modal isShown={isShown} hide={toggle} headerText="Game Over" modalContent={content} />
      </Container>
    </Section>
  );
}

export default Solution;