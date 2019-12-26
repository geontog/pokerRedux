import { Ranks, ratePokerHand, PokerRating } from './poker';
import _ from 'lodash';

const alphabet = 'abcdefghijklm'.split('');

const convertArrayToString = (array) => {
  const cards = _.orderBy(array[1].flat(), 'weight', 'desc');

  const arrayConvertedToString = cards.reduce(
    (finalArray, currElem) =>
      [...finalArray, array[0], alphabet[Ranks.indexOf(currElem.rank)]],
    []
  );
  return arrayConvertedToString;
}

export const winnerDecider = (pOneCards, pTwoCards) => {
  let pHand = Object.entries(pOneCards.ranksAmount).reverse().map(array => convertArrayToString(array)).flat();
  let pString = pHand.reduce(
    (fStr, cChar) => fStr + cChar,
    alphabet[Object.keys(PokerRating).reverse().indexOf(ratePokerHand(pOneCards))]
  );

  let oHand = Object.entries(pTwoCards.ranksAmount).reverse().map(array => convertArrayToString(array)).flat();
  let oString = oHand.reduce(
    (fStr, cChar) => fStr + cChar,
    alphabet[Object.keys(PokerRating).reverse().indexOf(ratePokerHand(pTwoCards))]
  );

  return pString > oString ? "playerOne" : "playerTwo";
}
