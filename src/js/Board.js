import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {
 renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        className = {this.props.winnerSquares.includes(i)
                      ?"square-winner":"square"}
        onClick={() => this.props.onClick(i)}
        key = {i} />
    );
  }

  render() {
    let rows = [];
    for (let i = 0; i <3 ; i++)
    {
        rows = rows.concat(this.boardRow(i*3));
    }
    return rows;
  }

  boardRow(index)
  {
    let squares = [];
    for(let i=0; i<3; i++)
    {
      squares = squares.concat(this.renderSquare(i+index));
    }
    return (<div className = "board-row" key={index}>{squares}</div>);
  }
}
