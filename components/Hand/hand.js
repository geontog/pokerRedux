import React from 'react';
import Card from '../Card/card';
import './hand.css';

const Hand = ({ cards, selections, roundSection, cardClick }) => (
  <div className="playingCards simpleCards needsAligning">
    <ul className="table">
      {cards.map(card => (
        <li className={roundSection === 2 ? "myCard" : ""} key={card.rank+card.suit}>
          <Card
            rank={card.rank}
            suit={card.suit}
            selected={selections[cards.indexOf(card)]}
            onClick={() => cardClick(card)}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default Hand;
