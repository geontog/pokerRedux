import update from 'immutability-helper';
import { refreshState } from './selectors';
import {
  changeCards,
  resetState,
  setWinner,
  alterBalance,
  setChangedCardsValue,
  newRound,
  typeBet,
  setAboutToFold,
  setRoundSection,
  setPlayerTurn,
  updateSelections,
  setHasToBet,
  alterMoneyPool,
  updateDeck
} from './actions';


const reducer = (state = refreshState(), { type, payload }) => {
  console.log(type, state.gameInfo.roundSection)
  switch(type) {
    case resetState.type:
      return refreshState();


    case typeBet.type:
      return update(state, {
        [payload.playerName] : {
          currentBet: { $set: payload.bet }
        }
      })

    case alterBalance.type:
      return update(state, {
          [payload.playerName] :  {
            balance: { $set: payload.bet }
          },
        })

    case alterMoneyPool.type:
      return update(state, {
        gameInfo: {
          moneyPool : { $set: payload.bet }
        }
      })

    case setHasToBet.type:
      return update(state, {
        [payload.playerName] : {
          hasToBet: { $set: payload.bet }
        }
      })


    case updateSelections.type:
      return update(state, {
          [payload.playerName] :  {
            selections: { $set: payload.selections }
          }
        })

    case changeCards.type:
      return update(state, {
        [payload.playerName]: {
          cards: { $set: payload.updatedCards }
        }
      });

    case updateDeck.type:
      return update(state, {
        gameInfo: {
          drawingDeck: { $set: payload.updatedDeck }
        }
      });

    case setChangedCardsValue.type:
      return update(state, {
        [payload.playerName]: {
          changedCards: { $set: payload.value }
        }
      })


    case setPlayerTurn.type:
      return update(state, {
        gameInfo: {
          playerTurn: { $set: payload.value }
        }
      })

    case setRoundSection.type:
      return update(state, {
        gameInfo: {
          roundSection: { $set: payload.value }
        }
      })


    case setAboutToFold.type:
      return update(state, {
        [payload.playerName]: {
          aboutToFold: { $set: payload.value }
        }
      })


    case setWinner.type:
      return update(state, {
        gameInfo: {
          winner: { $set: payload.winner }
          }
        })

    case newRound.type:
      return refreshState(state);

    default:
      return state
  }
}

export default reducer;
