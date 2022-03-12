import React from 'react';
import { Board } from './Board';
import { calculateWinner } from './functions';
import { Move } from './Move';
import { TextDiv } from './TextDiv';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        details: null,
      }],
      winnerSquares:[],
      xIsNext: true,
      stepNumber: 0,
      ascOrder: true,
    };
    this.jumpTo = this.jumpTo.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  
  renderMoves(history, ascOrder){
   return history.map((move, step) => 
    {
      return(
        <Move 
          key={step} 
          move={move} 
          step={step} 
          className={this.state.stepNumber === step ? 'clickable-div selected' : 'clickable-div unselected'} 
          onClick = {this.jumpTo}/>
      )
    })
    .sort((a, b) => { return a.key * ascOrder?1:-1 });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const ascOrder = this.state.ascOrder;
    const winner = calculateWinner(current.squares);
    const status = this.updateStatus(winner);
    const moves = this.renderMoves(history, ascOrder);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares = {winner[1]}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div><h2>{status}</h2></div>
          <div>
            <TextDiv 
              text={this.state.ascOrder ? "▲ Asc" : "▼ Desc"}
              onClick = {()=>this.setState({ascOrder: !this.state.ascOrder})}
              className= "clickable-div"
            />
            <ol reversed={!ascOrder}>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }


  updateStatus(winner){
    if (winner[0]) {
      return 'Winner: ' + winner[0];

    }
    else {
      if (this.state.stepNumber === 9) {
        return 'Draw';
      }
      else {
        return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(current.squares);

    
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        details: "" + (((i) % 3) + 1) +", " + (Math.ceil((i + 1) / 3)) ,
      }]),
      winnerSquares: winner[1],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

  }
}
