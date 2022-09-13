import styled from 'styled-components'

export const Section = styled.div`
  display:flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  background-color: #fff;
  border: 1px solid #e7eaf3;
  border-radius: 0.5rem;
  max-width:768px;
  margin: auto;
  padding: 20px;
  @media (max-width: 425px) {
    border: none;
    box-shadow: none;
    padding: 0 10px;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid black ;
  margin-bottom: 20px;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`
export const CellBoard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;  
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 30px;

`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`