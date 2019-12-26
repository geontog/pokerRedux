import { combineEpics, ofType } from 'redux-observable';
import { map, filter, mergeMap } from 'rxjs/operators';
import { winnerDecider } from '../../lib';
import { calcNewSelections, findNewCards } from './selectors';
import {
  changeCards,
  setWinner,
  fold,
  call,
  endRound,
  skipChange,
  setRoundSection,
  typeBet,
  setPlayerTurn,
  setChangedCardsValue,
  updateSelections,
  selectCard,
  setHasToBet,
  alterBalance,
  tryBet,
  tryChange,
  tryFold,
  setAboutToFold,
  alterMoneyPool,
  updateDeck
} from './actions';

const callEpic = (action$, state$) =>
action$.pipe(
  ofType(call.type),
  mergeMap(({
    payload: {
      playerName
    }
  }) => {
    const {
      [playerName]: {
        hasToBet
      }
    } = state$.value;
    return [
      typeBet(playerName, hasToBet),
      tryBet(playerName)
    ]
  }
))

const tryBetEpic = (action$, state$) =>
  action$.pipe(
    ofType(tryBet.type),
    filter(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          playerTurn,
          roundSection,
        },
        [playerName] : {
          currentBet,
          balance
        }
      } = state$.value;
      return (
        playerTurn === playerName
        && currentBet !== 0
        && Math.abs(roundSection-2) === 1
        && currentBet < balance
      );
    }),
    mergeMap(({
      payload: {
        playerName
      }
    }) => {
        const {
          [playerName]: {
            balance,
            currentBet,
            hasToBet
          },
          gameInfo: {
            roundSection,
            moneyPool,
            playerTurn
          }
        } = state$.value;
        const otherPlayer = playerName === "playerOne"
        ? "playerTwo" : "playerOne";
        let newPlayerTurn = otherPlayer;
        let newRoundSection = roundSection;
        if (currentBet === hasToBet) {
          newPlayerTurn = "playerOne";
          newRoundSection = roundSection + 1;
        }
        return [
          setHasToBet(otherPlayer, currentBet - hasToBet),
          setHasToBet(playerName, 0),
          alterBalance(playerName, balance-currentBet),
          alterMoneyPool(playerName, moneyPool + currentBet),
          typeBet(playerName, 0),
          setAboutToFold(playerName, false),
          setPlayerTurn(newPlayerTurn),
          setRoundSection(newRoundSection),
        ]
    })
  )


const selectCardSelectionsEpic = (action$, state$) =>
  action$.pipe(
    ofType(selectCard.type),
    filter(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          roundSection,
          playerTurn
        }
      } = state$.value;
      return (
        roundSection === 2
        && playerTurn === playerName
      )
    }),
    map(({
      payload: {
        playerName,
        clickedCard
      }
    }) => {
      const {
        [playerName]: {
          cards,
          selections
        }
      } = state$.value;
      return updateSelections(playerName,
        calcNewSelections(cards, selections, clickedCard)
      )
    }
  ))

const tryChangeEpic = (action$, state$) =>
    action$.pipe(
      ofType(tryChange.type),
      filter(({
        payload: {
          playerName
        }
      }) => {
        const {
          [playerName]: {
            selections
          },
          gameInfo: {
            roundSection,
            playerTurn
          }
        } = state$.value;
        return (
          selections.filter(bool => bool)
          && roundSection === 2
          && playerTurn === playerName
        )
      }),
      mergeMap(({
        payload: {
          playerName
        }
      }) => {
        const {
          [playerName]: {
            cards,
            selections,
            changedCards
          },
          gameInfo: {
            drawingDeck
          }
        } = state$.value;
        const {
          updatedCards,
          updatedDeck
        } = findNewCards(cards, selections, drawingDeck);
        return [
          changeCards(playerName, updatedCards),
          updateDeck(playerName, updatedDeck),
          setChangedCardsValue(playerName, !changedCards),
          updateSelections(playerName, Array(5).fill(false))
      ]}
    ))

const skipChangeEpic = (action$, state$) =>
  action$.pipe(
    ofType(skipChange.type),
    filter(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          roundSection,
          playerTurn
        }
      } = state$.value;
      return (roundSection === 2 && playerTurn === playerName)
    }),
    mergeMap(({
      payload: {
        playerName
      }
    }) => {
      const {
        [playerName]: {
          changedCards
        }
      } = state$.value;
      return [
        setChangedCardsValue(playerName, !changedCards),
        updateSelections(playerName, Array(5).fill(false))
        ]
      }
    )
  )

const changeCardsTurnEpic = (action$, state$) =>
  action$.pipe(
    ofType(setChangedCardsValue.type),
    filter(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          playerTurn
        },
        [playerName]: {
          changedCards
        }
      } = state$.value;
      return (playerTurn === "playerOne" && changedCards)
    }),
    map(() => {
      const {
        gameInfo: {
          playerTurn
        }
      } = state$.value;
      return setPlayerTurn(playerTurn === "playerOne" ? "playerTwo" : "playerOne")
    })
  )

const changeCardsRoundEpic = (action$, state$) =>
  action$.pipe(
    ofType(setChangedCardsValue.type),
    filter(() => {
      const {
        playerTwo: {
          changedCards: pTwoChangedCards
        }
      } = state$.value;
      return pTwoChangedCards;
    }),
    mergeMap(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          roundSection
        }
      } = state$.value;
      return [
        setPlayerTurn("playerOne"),
        setRoundSection(roundSection+1)
      ]
    })
  )


const tryFoldEpic = (action$, state$) =>
  action$.pipe(
    ofType(tryFold.type),
    filter(({
      payload: {
        playerName
      }
    }) => {
      const {
        gameInfo: {
          playerTurn,
          winner
        }
      } = state$.value;
      return playerName === playerTurn && !winner;
    }),
    map(({
      payload: {
        playerName
      }
    }) => {
      const {
        [playerName]: {
          aboutToFold
        }
      } = state$.value;
      return setAboutToFold(playerName, !aboutToFold)
    })
  )

const foldEpic = (action$, state$) =>
  action$.pipe(
    ofType(fold.type),
    mergeMap(({
      payload: {
        playerName
      }
    }) => {
      const {
        [playerName]: {
          aboutToFold
        }
      } = state$.value;
      return [
        setAboutToFold(playerName, !aboutToFold),
        endRound(playerName === "playerOne" ? "playerTwo" : "playerOne")
      ]
    })
  )

const finishEpic = (action$, state$) =>
  action$.pipe(
    ofType(setRoundSection.type),
    filter(() => {
      const {
        gameInfo: {
          roundSection
        }
      } = state$.value
      return roundSection === 4;
    }),
    map(() => {
      const {
        playerOne: {
          cards: {
            cards: playerOneCards
          }
        },
        playerTwo: {
          cards: {
            cards: playerTwoCards
          }
        }
      } = state$.value;
      return endRound(winnerDecider(playerOneCards, playerTwoCards));
    })
  )

const roundEndEpic = (action$, state$) =>
  action$.pipe(
    ofType(endRound.type),
    mergeMap(({
      payload: {
        playerName
      }
    }) => {
      const {
        [playerName]: {
          balance
        },
        gameInfo: {
          moneyPool
        }
      } = state$.value;
      return [
        setWinner(playerName),
        alterBalance(playerName, balance + moneyPool),
        alterMoneyPool(playerName, 0)
      ]}
    )
  )


export default combineEpics(
  changeCardsTurnEpic,
  tryBetEpic,
  changeCardsRoundEpic,
  tryChangeEpic,
  selectCardSelectionsEpic,
  skipChangeEpic,
  callEpic,
  finishEpic,
  foldEpic,
  roundEndEpic,
  tryFoldEpic
);
