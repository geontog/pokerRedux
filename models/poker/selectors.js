import * as poker from '../../lib/poker';

const refreshState = (state) => {
  const startingDeck = new poker.PlayingCards();
  const startingPlayer1Cards = startingDeck.getNCardsAndRest(5);
  const startingPlayer2Cards = startingPlayer1Cards.restCards.getNCardsAndRest(5);
  const startingDrawingDeck = startingPlayer2Cards.restCards.getNCardsAndRest();
  return {
    playerOne: {
      cards: startingPlayer1Cards,
      selections: Array(5).fill(false),
      balance: state === undefined ? 200 : state.playerOne.balance,
      changedCards: false,
      currentBet: 0,
      hasToBet: 0,
      aboutToFold: false
    },
    playerTwo: {
      cards: startingPlayer2Cards,
      selections: Array(5).fill(false),
      balance: state === undefined ? 200 : state.playerTwo.balance,
      changedCards: false,
      currentBet: 0,
      hasToBet:  0,
      aboutToFold: false
    },
    gameInfo: {
      moneyPool: 0,
      drawingDeck: startingDrawingDeck,
      winner: "",
      roundSection: 1,
      playerTurn: "playerOne",
    }
  }
}

const calcNewSelections = ( cards, selections, clickedCard) => {
  const newSelections = selections.slice();
  const index = cards.cards.orderedCards.indexOf(clickedCard);
  newSelections[index] = !newSelections[index];
  return newSelections.filter(Boolean).length === 4 ? selections : newSelections;
}

const findNewCards = (cards, selections, drawingDeck) => {
  const cardSelections = selections.slice();
  const orderedCards = cards.cards.orderedCards;
  let filteredCards = orderedCards.filter(
    card => !(cardSelections[orderedCards.indexOf(card)])
  );


  const noOfNewCards = 5 - filteredCards.length;
  const updatedDeck = drawingDeck.restCards.getNCardsAndRest(noOfNewCards);
  const drawnCards = updatedDeck.cards.orderedCards;

  const newCards = [...filteredCards, ...drawnCards];

  return {
    updatedCards: {
      ...cards,
      cards: new poker.PlayingCards(newCards, 0, 5)
    },
    updatedDeck
  }
}

export { findNewCards, calcNewSelections, refreshState };
