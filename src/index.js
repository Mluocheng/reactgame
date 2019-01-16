import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//创建组件Square 代表一个单个button
// class Square extends React.Component {
  // render() {
    // return (
      // <button className="square" onClick={() => this.props.onClick()}>
		// {this.props.value} 
      // </button>
    // );
  // }
// }

//***函数定义的方式 重写以上的Square 组件  仅限只有render方法的组件
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {//创建组件Board 包含9个 Square button
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
	  stepNumber:0,
      xIsNext: true
    };
  }
	//handleClick方法
	handleClick(i){
		const history = this.state.history.slice(0,this.state.stepNumber + 1);
		const current = history[history.length -1];
		
		const squares = current.squares.slice();
		//判断是否已经落子或者获胜 就无法继续落子判断
		if(clculateWinner(squares) || squares[i]){
		return;	
		}
	
		squares[i] = this.state.xIsNext?'X':'O';
		this.setState({
			history:history.concat([{
				squares:squares
			}]),
			stepNumber:history.length,
			xIsNext:!this.state.xIsNext,
			})
	}
	jumpTo(step){
		this.setState({
			stepNumber:step,
			xIsNext:(step % 2)? false: true,
		})
	}
	
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = clculateWinner(current.squares);

	//展示每步历史记录
  const moves = history.map((step,move) => {
	  const desc = move?'Move # ' + move : 'Game start';
	return ( 
	<li key={move}>
		<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
	</li>
	)
  }
  )
	
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//获胜判断规则
function clculateWinner(squares){
	const lines = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
	];
	for(let i=0;i<lines.length;i++){
		const [a,b,c]=lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			return squares[a]
		}
	}
	return null;
}

















