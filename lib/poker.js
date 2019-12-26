import _ from 'lodash';

export const Ranks = Object.freeze([ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]);
const Suits = Object.freeze([ 'hearts', 'diams', 'clubs', 'spades' ]);

const Cards = (
  Object.entries(Ranks).reduce(
    (cards, [ weight, rank ]) =>
      [...cards, ...Suits.map(suit => ({ rank, suit, weight: Number(weight) + 1 }))],
    []
  )
);

export class PlayingCards  {
  constructor(cards = null, from = 0, to = 0) {
    const cardsSource = cards instanceof Array ? cards : Cards;
    const cardsRange = cardsSource.slice(from, to || cardsSource.length);

    this.cards = cardsRange.sort(() => Math.random() - 0.5);

    this.orderedCards = _.sortBy(this.cards, 'weight').reverse();
    this.ranks =  _.groupBy(this.orderedCards, 'rank');
    this.ranksAmount = _.groupBy(this.ranks, 'length');

    this.suits  = _.groupBy(this.orderedCards, 'suit');
    this.suitsAmount  = _.groupBy(this.suits, 'length');

  }

  getNCardsAndRest(n) {
    return {
      cards: new PlayingCards(this.cards, 0, n),
      restCards: new PlayingCards(this.cards, n, this.cards.length),
    };
  }

  getOfSameRank(n) { return this.ranksAmount[n] || []; }

  getOfSameSuit(n) { return this.suitsAmount[n] || []; }

  hasAce() { return !!this.ranks['A']; }

  hasOfSameRank(n) { return this.getOfSameRank(n).length; }

  hasOfSameSuit(n) { return this.getOfSameSuit(n).length; }

  hasInARow(n) {
    const rowCards = this.orderedCards.map((card) => card.weight + this.orderedCards.indexOf(card));
    const rowCardsFiltered = rowCards.filter(i => i ===  rowCards[rowCards.indexOf(i)+1]);
    const orderedRowCardsAmount = _.groupBy(_.groupBy(rowCardsFiltered), 'length');
    const keys = Object.keys(orderedRowCardsAmount);
    const highestInARow = keys[keys.length-1]
    return _.isEmpty(orderedRowCardsAmount) ? false : highestInARow >= n;
  }
}

export const PokerRating = {
  RoyalFlush: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5),
  FourOfAKind: (hand) => hand.hasOfSameRank(4),
  FullHouse: (hand) => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: (hand) => hand.hasOfSameSuit(5),
  Straight: (hand) => hand.hasInARow(5),
  ThreeOfAKind: (hand) => hand.hasOfSameRank(3),
  TwoPair: (hand) => hand.hasOfSameRank(2) >= 2,
  OnePair: (hand) => hand.hasOfSameRank(2),
  HighCard: (hand) => hand.hasOfSameRank(1) >= 5,
};

export const ratePokerHand = (cards) => {
  return Object.entries(PokerRating).filter(array => array[1](cards))[0][0];
}
