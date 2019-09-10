import React from 'react';
import './Game.css';
import Modal from '../Modal/Modal';
import Square from './Square/Square';
import Player from './Player/Player';
import Brandom from './Player/bots/Brandom';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.rows = parseInt(this.props.rows) || 3;
        this.cols = parseInt(this.props.cols) || this.rows;
        this.sequence = parseInt(this.props.sequence) || Math.max(this.rows, this.cols);

        document.documentElement.style.setProperty("--rows", this.rows);
        document.documentElement.style.setProperty("--cols", this.cols);
        document.documentElement.style.setProperty("--max", Math.max(this.rows, this.cols));
        document.documentElement.style.setProperty("--rows-relation", Math.min(1, this.rows / this.cols));
        document.documentElement.style.setProperty("--cols-relation", Math.min(1, this.cols / this.rows));

        const playersObj = JSON.parse(this.props.players);
        if(playersObj && playersObj.length > 1) {
            this.players = [];

            for(const [i, playerObj] of playersObj.entries()) {
                if(!playerObj.name) playerObj.name = "Player " + (i + 1);
                if(!playerObj.symbol) playerObj.symbol = (i + 1) % 10;
                switch(playerObj.type) {
                    case "Brandom": this.players.push(new Brandom(this, i, playerObj.symbol, playerObj.name)); break;
                    default: this.players.push(new Player(playerObj.symbol, playerObj.name));
                }
            }
        } else this.players = [new Player("X", "Player 1"), new Player("O", "Player 2")];

        const squares = this.getMatrix();

        this.state = { squares, running: true, hasWinner: false, winner: null, turn: 0, showModal: false };

        if(this.players[0].isBot()) {
            setTimeout(() => {
                const square = this.players[0].play();
                this.markSquare(square.rowIndex, square.colIndex);
            }, 100);
        }
    }

    reset() {
        const squares = this.getMatrix();
        this.setState({ squares, running: true, hasWinner: false, winner: null, turn: 0 });

        if(this.players[0].isBot()) {
            setTimeout(() => {
                const square = this.players[0].play();
                this.markSquare(square.rowIndex, square.colIndex);
            }, 100);
        }
    }

    getMatrix() {
        const squares = Array(this.rows);
        for(let i = 0; i < squares.length; i++) {
            squares[i] = Array(this.cols);
            for(let j = 0; j < squares[i].length; j++)
                squares[i][j] = -1;
        }
        return squares;
    }

    getAvailableSquares() {
        const availableSquares = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.state.squares[i][j] === -1) {
                    availableSquares.push({ rowIndex: i, colIndex: j });
                }
            }
        }
        return availableSquares;
    }

    getRow(rowIndex) {
        return this.state.squares[rowIndex].slice();
    }

    getCol(colIndex) {
        const arr = [];
        for(let i = 0; i < this.rows; i++)
            arr.push(this.state.squares[i][colIndex]);
        return arr;
    }

    getCrescentDiagonal(rowIndex, colIndex) {
        const arr = [];
        for(let i = rowIndex, j = colIndex; i >= 0 && j < this.cols; i--, j++)
            arr.push(this.state.squares[i][j]);
        return arr;
    }

    getDecrescentDiagonal(rowIndex, colIndex) {
        const arr = [];
        for(let i = rowIndex, j = colIndex; i < this.rows && j < this.cols; i++, j++)
            arr.push(this.state.squares[i][j]);
        return arr;
    }

    findSequenceInArray(arr) {
        let sequence = 1;
        for(let i = 1; i < arr.length; i++) {
            if(arr[i] === arr[i - 1] && arr[i] !== -1) {
                if(++sequence === this.sequence) return { hasWinner: true, winner: arr[i] };
            } else sequence = 1;
        }
        return { hasWinner: false };
    }

    calculateGameState() {
        for(let i = 0; i < this.rows; i++) {
            const result = this.findSequenceInArray(this.getRow(i));
            if(result.hasWinner) return { running: false, ...result };
        }
        for(let i = 0; i < this.cols; i++) {
            const result = this.findSequenceInArray(this.getCol(i));
            if(result.hasWinner) return { running: false, ...result };
        }

        for(let i = this.sequence - 1; i < this.rows; i++) {
            const result = this.findSequenceInArray(this.getCrescentDiagonal(i, 0));
            if(result.hasWinner) return { running: false, ...result };
        }

        for(let i = 1; i <= this.cols - this.sequence; i++) {
            const result = this.findSequenceInArray(this.getCrescentDiagonal(this.rows - 1, i));
            if(result.hasWinner) return { running: false, ...result };
        }

        for(let i = 0; i <= this.rows - this.sequence; i++) {
            const result = this.findSequenceInArray(this.getDecrescentDiagonal(i, 0));
            if(result.hasWinner) return { running: false, ...result };
        }

        for(let i = 1; i <= this.cols - this.sequence; i++) {
            const result = this.findSequenceInArray(this.getDecrescentDiagonal(0, i));
            if(result.hasWinner) return { running: false, ...result };
        }

        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.state.squares[i][j] === -1) return { running: true };
            }
        }
        
        return { running: false, hasWinner: false };
    }

    getGameStateMessage() {
        if(this.state.running) {
            return this.players[this.state.turn].name + " plays";
        } else if(this.state.hasWinner) {
            return this.players[this.state.winner].name + " wins!";
        } else {
            return "Draw!";
        }
    }

    markSquare(i, j) {
        if(!this.state.running || this.state.squares[i][j] !== -1) return;

        const squares = this.state.squares.slice();
        let turn;
        squares[i][j] = turn = this.state.turn;
        const gameState = this.calculateGameState();

        if(gameState.running)
            turn = this.state.turn < this.players.length - 1 ? this.state.turn + 1 : 0;
        else if(!gameState.hasWinner)
            turn = -1;

        this.setState({ squares, turn, ...gameState });
        this.setState({ showModal: !gameState.running });

        if(gameState.running && this.players[turn].isBot()) {
            setTimeout(() => {
                const square = this.players[turn].play();
                this.markSquare(square.rowIndex, square.colIndex);
            }, 100);
        }
    }

    handleSquareClick(i, j) {
        if(this.state.running && this.state.squares[i][j] === -1 && !this.players[this.state.turn].isBot())
            this.markSquare(i, j);
    }
  
    renderSquare(i, j) {
        return (
            <Square
                key={i * this.cols + j}
                onClick={() => this.handleSquareClick(i, j)}
                value={this.state.squares[i][j] !== -1 ? this.players[this.state.squares[i][j]].getSymbol() : ""}
                cursor={!this.state.running || this.state.squares[i][j] !== -1 ? "default" : "pointer"}
            />
        );
    }
    
    renderAllSquares() {
        const squaresElements = [];
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j < this.cols; j++)
                squaresElements.push(this.renderSquare(i, j));
        return squaresElements;
    }

    renderPlayerButton(playerIndex) {
        let playerButtonStyles = {};
        if(this.state.turn === playerIndex)
            playerButtonStyles = { backgroundColor: "#00aaff", color: "white" };
        return (
            <button key={playerIndex} style={playerButtonStyles}>
                { this.players[playerIndex].getName() }
            </button>
        )
    }

    renderAllPlayerButtons() {
        const playerButtons = [];
        for(let i = 0; i < this.players.length; i++) {
            playerButtons.push(this.renderPlayerButton(i));
        }
        return playerButtons;
    }

    render() {
        return (
            <div className="Game">
                <div className="Board">
                    { this.renderAllSquares() }
                </div>
                <div className="PlayersPanel">
                    { this.renderAllPlayerButtons() }
                </div>
                <div className="ControlPanel">
                    <button className="Reset" onClick={ () => this.reset() }>Reset</button>
                </div>
                <Modal display={this.state.showModal}>
                    { this.getGameStateMessage() }
                    <br /><br />
                    <button onClick={ () => this.setState({ showModal: false }) }>Ok</button>
                </Modal>
            </div>
        );
    }
}