import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";

import Solution from './solution';
import ball from "./assets/ball.png"
import { Button, Cell, Text } from './components'

describe("Labyrinth", () => {
  it("should win", async () => {
    render( <Solution /> )
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('Next level')).toBeInTheDocument();
    expect(screen.getByText('Next level')).toBeDisabled();
    const cells = screen.queryAllByTestId("cell");
    const container = screen.getByTestId("container")
    let ball = within(cells[0]).getByRole('img')
    expect(ball).toBeInTheDocument()   
    
    fireEvent.keyDown(container, { key: 'ArrowUp', charCode: 38, keyCode: 38 }); // fire Arrow-Up key press event 
    expect(ball).toBeInTheDocument();
    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 }); // fire Arrow-left key press event
    expect(ball).toBeInTheDocument();
    fireEvent.keyDown(container, { key: 'ArrowDown', charCode: 40, keyCode: 40 }); // fire Arrow-left key press event
    expect(ball).toBeInTheDocument();
        

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[1]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[2]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowDown", charCode: 40, keyCode: 40 });
    ball = within(cells[7]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowDown", charCode: 40, keyCode: 40 });
    ball = within(cells[12]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowDown", charCode: 40, keyCode: 40 });
    ball = within(cells[17]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowDown", charCode: 40, keyCode: 40 });
    ball = within(cells[22]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[23]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[24]).getByRole('img')

    expect(screen.getByTestId('message')).toHaveTextContent('You Won')
    expect(screen.getByText('Next level')).not.toBeDisabled()
  });

  it("should lose", () => {
    render( <Solution /> )
    expect(screen.getByText('Restart')).toBeInTheDocument()
    expect(screen.getByText('Next level')).toBeInTheDocument()
    expect(screen.getByText('Next level')).toBeDisabled()
    const cells = screen.queryAllByTestId("cell")
    const container = screen.getByTestId("container")
    let ball = within(cells[0]).getByRole('img')
    expect(ball).toBeInTheDocument()   
    
    fireEvent.keyDown(container, { key: 'ArrowUp', charCode: 38, keyCode: 38 }); // fire Arrow-Up key press event 
    expect(ball).toBeInTheDocument();
    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 }); // fire Arrow-left key press event
    expect(ball).toBeInTheDocument();
    fireEvent.keyDown(container, { key: 'ArrowDown', charCode: 40, keyCode: 40 }); // fire Arrow-left key press event
    expect(ball).toBeInTheDocument();
        

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[1]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[2]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[3]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[4]).getByRole('img')

    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 })
    ball = within(cells[3]).getByRole('img')

    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 })
    ball = within(cells[2]).getByRole('img')

    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 })
    ball = within(cells[1]).getByRole('img')

    fireEvent.keyDown(container, { key: 'ArrowLeft', charCode: 37, keyCode: 37 })
    ball = within(cells[0]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[1]).getByRole('img')

    fireEvent.keyDown(container, { key: "ArrowRight", charCode: 39, keyCode: 39 });
    ball = within(cells[2]).getByRole('img')

    expect(screen.getByTestId('message')).toHaveTextContent('You Lost')
  });
});


describe("component", () => {
  it("component - button should be disabled", () => {
    render(<Button disabled={true}> test button </Button>)
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('test button');
    expect(screen.getByRole('button')).toBeDisabled();
  })

  it("component - button should be enabled", () => {
    render(<Button> test button </Button>)
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('test button');
    expect(screen.getByRole('button')).not.toBeDisabled();
  })
  
  it("component - cell shoud contain ball image", () => {
    render(<Cell value={1} ball={ball} />)
    const cell = screen.getByTestId('cell')
    expect(cell).toBeInTheDocument();
    const ballElement = within(cell).getByRole('img')
    expect(ballElement).toBeInTheDocument();
  })

  it("component - cell background color test", () => {
    const { rerender } = render(<Cell value={5} ball={ball} />)
    const cell = screen.getByTestId('cell')
    expect(cell).toBeInTheDocument();
    let style = window.getComputedStyle(cell)
    expect(style.backgroundColor).toEqual('rgb(255, 255, 100)')

    rerender(<Cell value={0} ball={null} />)
    style = window.getComputedStyle(cell)
    expect(style.backgroundColor).toEqual('white')
    
    rerender(<Cell value={1} ball={null} />)
    style = window.getComputedStyle(cell)
    expect(style.backgroundColor).toEqual('rgb(126, 125, 125)')

    rerender(<Cell value={10} ball={null} />)
    style = window.getComputedStyle(cell)
    expect(style.backgroundColor).toEqual('rgb(161, 246, 183)')
  })

  it("component - text", () => {
    render(<Text color="black" fontSize={15}> test </Text>)
    const text = screen.getByText('test') 
    expect(text).toBeInTheDocument();

    let style = window.getComputedStyle(text)
    expect(style.color).toEqual('black')
    expect(style.fontSize).toEqual('15px')
  })
})
