import React from 'react';
import './cssCards/cards.css';

const Card = ({ rank, suit, onClick, selected }) => {
  const card = (
    <div className={`card rank-${rank} ${suit}`} onClick={onClick}>
      <span className="rank">{rank}</span>
      <span className="suit" dangerouslySetInnerHTML={{__html:"&" + suit + ";"}}></span>
    </div>
  );
  return selected ? <strong>{card}</strong> : card;
}

export default Card;
