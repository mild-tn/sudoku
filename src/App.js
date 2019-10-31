import React from 'react';
import './App.css';

const validate = board => {
  let isValid = true;
  for (let i = 0; i < 4; i++) {
    const horizontal = new Set();
    const vertical = new Set();
    const square = new Set();
    for (let j = 0; j < 4; j++) {
      horizontal.add(board[i][j]);
      vertical.add(board[j][i]);
      square.add(board[2 * (i % 2) + (j % 2)][2 * Math.floor(i / 2) + Math.floor(j / 2)]);
    }
    horizontal.delete(0);
    vertical.delete(0);
    square.delete(0);
    if (horizontal.size !== 4 || vertical.size !== 4 || square.size !== 4) {
      isValid = false;
    }
  }
  return isValid;
};

class Cell extends React.Component {
  render() {
    return (
      <div
        className={`cell ${this.props.isInitial ? 'initial' : ''}`}
        onClick={() => {
          if (this.props.isInitial) return;
          this.props.onChange((this.props.number + 1) % 5);
        }}
      >
        {this.props.number !== 0 && this.props.number}
      </div>
    );
  }
}

class Board extends React.Component {
  state = {
    board: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
    initial: [
      [true, true, true, true],
      [true, true, false, false],
      [true, false, true, false],
      [true, false, false, true],
    ],
    status: '',
  };

  submit = () => {
    const isValid = validate(this.state.board);
    this.setState({ status: isValid ? 'Board is valid. :)' : 'Board is invalid. :(' });
  };
  render() {
    return (
      <div className="board">
        {this.state.board.map((row, i) =>
          row.map((number, j) => (
            <Cell
              key={`cell-${i}-${j}`}
              number={number}
              isInitial={this.state.initial[i][j]}
              onChange={newNumber => {
                const { board } = this.state;
                board[i][j] = newNumber;
                this.setState({
                  board,
                });
              }}
            />
          ))
        )}
        <button onClick={this.submit}>Submit</button>
        <p>{this.state.status}</p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
