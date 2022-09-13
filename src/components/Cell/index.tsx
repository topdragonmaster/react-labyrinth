import React from "react";
import styled from "styled-components";

interface ICell {
  value: number;
  ball: string;
}

interface IContainer {
  value: number;
}

interface IBall {
  src: string;
}

const Container = styled.div<IContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #847e7e;
  color: #111011;
  width: 70px;
  height: 70px;
  @media (max-width: 425px) {
    width: 50px;
    height: 50px;
  }
  background-color: ${(props: IContainer) => {
    switch (props.value) {
      case 0: return 'white'
      case 1: return '#7e7d7d'
      case 5: return '#ffff64'
      case 10: return '#a1f6b7'
      default : return 'white'
    }
  }};
  

`

const Ball = styled.img`
  border: none;
  outline: none;
  appearance: none;
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  @media (max-width: 425px) {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }
`

export const Cell: React.FC<ICell> = ({
  value,
  ball
}: ICell): JSX.Element => {
  return (
    <Container value={value} data-testid="cell">
      {ball ? <Ball src={ball} alt="ball"></Ball>: <></>}
    </Container>
  )
}
