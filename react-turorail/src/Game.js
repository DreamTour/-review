import React from "react";

function Square(props){
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare=(i) =>{
        return (<Square
            value={this.props.squares[i]}
            onClick={()=>{
                this.props.onClick(i);
            }}
        />);
    }

    render() {
        return (
            <div>
                <div className="status">game:</div>
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
    constructor(props){
        super(props);
        this.state={
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick=(i)=>{
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length - 1];
        let arr=current.squares.slice();
        if(this.calculateWinner(arr)||arr[i]){
            return
        }
        arr[i]=this.state.xIsNext?'x':'o'

        this.setState({
            history:history.concat([{
                squares:arr,
            }]),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length,
        })
    }

    jumpTo=(index)=>{
        this.setState({
            stepNumber:index,
            xIsNext:(index%2)===0,
        })
    }

    calculateWinner=(squares)=>{
        const lines=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let linesLen=lines.length;
        for(let i=0;i<linesLen;i++){
            const [a,b,c]=lines[i];
            if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
                return squares[a]
            }
        }
        return null
    }

    render() {
        const history = this.state.history;
        const current=history[this.state.stepNumber]
        const winner=this.calculateWinner(current.squares);
        const moves=history.map((value, index, array)=>{
            const desc=index? 'Go to move #' + index : 'Go to game start';
            return (
                <li key={'move'+index}>
                    <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            )
        })
        let status='';
        if(winner){
            status = 'winner: '+winner;
        }else{
            status = 'Next player: '+(this.state.xIsNext?'x':'o');
        }
        console.log('history',this.state.history)
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        status={status}
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
export default Game