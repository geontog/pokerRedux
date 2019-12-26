const TYPE_BET = 'TYPE_BET';
const typeBet = (playerName, bet) => ({
  type: TYPE_BET,
  payload: {
    playerName,
    bet
  }
})
typeBet.type = TYPE_BET;

const CALL = 'CALL';
const call = playerName => ({
  type: CALL,
  payload: {
    playerName
  }
})
call.type = CALL;

const TRY_BET = 'TRY_BET';
const tryBet = playerName => ({
  type: TRY_BET,
  payload: {
    playerName
  }
})
tryBet.type = TRY_BET;

const SET_HAS_TO_BET = 'SET_HAS_TO_BET';
const setHasToBet = (playerName, bet) => ({
  type: SET_HAS_TO_BET,
  payload: {
    playerName,
    bet
  }
})
setHasToBet.type = SET_HAS_TO_BET;

const ALTER_BALANCE = 'ALTER_BALANCE';
const alterBalance = (playerName, bet) => ({
  type: ALTER_BALANCE,
  payload: {
    playerName,
    bet
  }
})
alterBalance.type = ALTER_BALANCE;

const ALTER_MONEY_POOL = 'ALTER_MONEY_POOL_BET';
const alterMoneyPool = (playerName, bet) => ({
  type: ALTER_MONEY_POOL,
  payload: {
    playerName,
    bet
  }
})
alterMoneyPool.type = ALTER_MONEY_POOL;


const SELECT_CARD = 'SELECT_CARD';
const selectCard = (playerName, clickedCard) => ({
  type: SELECT_CARD,
  payload: {
    playerName,
    clickedCard
  }
})
selectCard.type = SELECT_CARD;

const UPDATE_SELECTIONS = 'UPDATE_SELECTIONS';
const updateSelections = (playerName, selections) => ({
  type: UPDATE_SELECTIONS,
  payload: {
    playerName,
    selections
  }
})
updateSelections.type = UPDATE_SELECTIONS;

const TRY_CHANGE = 'TRY_CHANGE';
const tryChange = playerName => ({
  type: TRY_CHANGE,
  payload: {
    playerName
  }
})
tryChange.type = TRY_CHANGE;

const CHANGE_CARDS = 'CHANGE_CARDS';
const changeCards = (playerName, updatedCards) => ({
  type: CHANGE_CARDS,
  payload: {
    playerName,
    updatedCards
  }
})
changeCards.type = CHANGE_CARDS;

const UPDATE_DECK = 'UPDATE_DECK';
const updateDeck = (playerName, updatedDeck) => ({
  type: UPDATE_DECK,
  payload: {
    playerName,
    updatedDeck
  }
})
updateDeck.type = UPDATE_DECK;

const SKIP_CHANGE = 'SKIP_CHANGE';
const skipChange = playerName => ({
  type: SKIP_CHANGE,
  payload: {
    playerName
  }
})
skipChange.type = SKIP_CHANGE;

const SET_CHANGED_CARDS_VALUE = 'SET_CHANGED_CARDS_VALUE';
const setChangedCardsValue = (playerName, value) => ({
  type: SET_CHANGED_CARDS_VALUE,
  payload: {
    playerName,
    value
  }
})
setChangedCardsValue.type = SET_CHANGED_CARDS_VALUE;


const SET_PLAYER_TURN = 'SET_PLAYER_TURN';
const setPlayerTurn = value => ({
  type: SET_PLAYER_TURN,
  payload: {
    value
  }
})
setPlayerTurn.type = SET_PLAYER_TURN;

const INCREMENT_ROUND_SECTION = 'INCREMENT_ROUND_SECTION';
const setRoundSection = value => ({
  type: INCREMENT_ROUND_SECTION,
  payload: {
    value
  }
})
setRoundSection.type = INCREMENT_ROUND_SECTION;


const TRY_FOLD = 'TRY_FOLD';
const tryFold = playerName => ({
  type: TRY_FOLD,
  payload: {
    playerName
  }
})
tryFold.type = TRY_FOLD;

const SET_ABOUT_TO_FOLD = 'SET_ABOUT_TO_FOLD';
const setAboutToFold = (playerName, value) => ({
  type: SET_ABOUT_TO_FOLD,
  payload: {
    playerName,
    value
  }
})
setAboutToFold.type = SET_ABOUT_TO_FOLD;

const FOLD = 'FOLD';
const fold = playerName => ({
  type: FOLD,
  payload: {
    playerName
  }
})
fold.type = FOLD;

const END_ROUND = 'END_ROUND';
const endRound = playerName => ({
  type: END_ROUND,
  payload: {
    playerName
  }
})
endRound.type = END_ROUND;

const SET_WINNER = 'SET_WINNER';
const setWinner = winner => ({
  type: SET_WINNER,
  payload: {
    winner
  }
})
setWinner.type = SET_WINNER;

const NEW_ROUND = 'NEW_ROUND';
const newRound = () => ({
  type: NEW_ROUND,
})
newRound.type = NEW_ROUND;

const RESET_STATE = 'RESET_STATE';
const resetState = () => ({
  type: RESET_STATE,
})
resetState.type = RESET_STATE;


export {
  changeCards,
  selectCard,
  resetState,
  setWinner,
  fold,
  endRound,
  newRound,
  typeBet,
  skipChange,
  setRoundSection,
  call,
  setAboutToFold,
  setPlayerTurn,
  alterBalance,
  updateSelections,
  setHasToBet,
  tryBet,
  setChangedCardsValue,
  tryChange,
  tryFold,
  alterMoneyPool,
  updateDeck
};
