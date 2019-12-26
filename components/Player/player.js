import React from 'react';
import { HandContainer } from '../../containers';
import './player.css';

const Player = ({ playerName, cardClick, selections, skipChange, aboutToFold,
    balance, onSubmit, onChange, changeCards, fold, currentBet, call,
    flipAboutToFold }) =>
(
  <div className="player">
    <h1>{[playerName]} - {balance}$</h1>
    <HandContainer playerName={playerName}/>
    <div className="bettingControls">
      <button key="call" className="btn-success" onClick={() => call()}>
        Call
      </button>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
        <input
          onChange={event => { onChange(parseInt(event.target.value)) }}
          type='number'
          value={currentBet}
        />
        <button type="submit">
          Bet
        </button>
      </form>
    </div>
    <div className="cardChangingControls">
      <button key="change" className="btn-success" onClick={() => changeCards()}>
        Change Selected Card(s)
      </button>
      <button key="skip" className="btn-success" onClick={() => skipChange()}>
        Skip Change
      </button>
    </div>
    <div>
      {!aboutToFold ?
        <button className="btn-warning" onClick={() => flipAboutToFold()}>
          Fold
        </button>
        :
        <div>
          <h3>are you sure you want to fold?</h3>
          <button className="btn-warning" onClick={() => fold()}>
            Yes
          </button>
          <button className="btn-warning" onClick={() => flipAboutToFold()}>
            No
          </button>
        </div>
      }
    </div>
  </div>
);

export default Player;
