import { useState } from "react";
import Card from "../card/Card";
import Icon from "../Icon/Icon";
import './Grid.css';
import { ToastContainer, toast } from 'react-toastify';

function isWinner(board, symbol){
    if(board[0] == board[1] && board[1] == board[2] && board[2] == symbol) return symbol;
    if(board[3] == board[4] && board[4] == board[5] && board[5] == symbol) return symbol;
    if(board[6] == board[7] && board[7] == board[8] && board[8] == symbol) return symbol;

    if(board[0] == board[3] && board[3] == board[6] && board[6] == symbol) return symbol;
    if(board[1] == board[4] && board[4] == board[7] && board[7] == symbol) return symbol;
    if(board[2] == board[5] && board[5] == board[8] && board[8] == symbol) return symbol;

    if(board[0] == board[4] && board[4] == board[8] && board[8] == symbol) return symbol;
    if(board[2] == board[4] && board[4] == board[6] && board[6] == symbol) return symbol;

    return null;
}

function Grid({numberOfCards}){
    const [turn, setTurn] = useState(true);    //If turn false -> X if true -> O
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));      //["","","","","","","","",""] An empty array will be formed.
    const [winner, setWinner] = useState(null);

    function play(index){
        setTurn(!turn);
        if(turn == true)
        {
            board[index] = 'O';
        } else if(turn == false)
        {
            board[index] = 'X';
        }
        setBoard([... board]);
        const win = isWinner(board, turn ? 'O' : 'X');
        console.log("The winner is : ", win)
        if(win){
            setWinner(win);
            toast.success(`Congraturations ${win} won the game`);
        }
        // setBoard([... board]);
        console.log("Move played", index);
    }

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }

    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turnHighlight">Winner is : {winner}</h1>
                    <button className="resetButton" onClick={reset}>Reload Game</button>
                    <ToastContainer position="top-left" />
                </>
            )}
            <h1 className="currentTurn">Current Turn: {(turn) ? 'O' : 'X'}</h1>
            <div className="grid">
                {/* {Array(numberOfCards).fill(<Card />).map((el, idx) => {
                    return <Card onPlay={play} key={idx} />             //here onPlay is a custom prop
                })} */}

                {board.map((value, idx) => {
                    return <Card gameEnd={winner ? true : false} onPlay={play} player={value} key={idx} index={idx} />             //here onPlay is a custom prop
                })}
            </div>
            {/* {winner && (
                <>
                    <h1 className="turnHighlight">Winner is : {winner}</h1>
                    <button className="resetButton" onClick={reset}>Reload Game</button>
                    <ToastContainer position="top-center" />
                </>
            )} */}
        </div>
    )
}

export default Grid;