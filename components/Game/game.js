import React from 'react';
import { PlayerContainer } from '../../containers';
import './game.css';
import { parts } from '../../models/poker'


const Game = ({moneyPool, winner, newRound, resetState, status,
  roundSection, playerTurn }) => (
  <div className="game">
    <div className="container box">
      <PlayerContainer playerName="playerOne" />
    </div>
    <div className="container moneyWinner box">
      <h3>Money Pool: {moneyPool}$</h3>
      <h3>{winner ? "" : parts[roundSection-1]}</h3>
      <h3>{winner ? "" : `${playerTurn}'s turn`}</h3>
      <h1>{winner ? `${winner} Wins!` : ""}</h1>
      {winner ?
        <button className="btn-info" onClick={() => newRound()}>
          New Round
        </button>
        :
        <span></span>
      }
    </div>
    <div className="container box">
      <PlayerContainer playerName="playerTwo" />
    </div>
    <div className="container box">
      <button className="btn-danger" onClick={() => resetState()}>
        Reset State (Deletes All Progress)
      </button>
    </div>
  </div>
)

export default Game;
