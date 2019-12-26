import { connect } from 'react-redux';
import { tryChange, fold, typeBet, call,
  skipChange, tryFold, tryBet } from '../models/poker';
import { Player } from '../components';


const mapStateToProps = (state, { playerName }) => {
  const { balance, currentBet, aboutToFold } = state[playerName];
  return {
    balance,
    currentBet,
    playerName,
    aboutToFold
  }
}

const mapDispatchToProps = (dispatch, { playerName }) => ({
  changeCards: () => dispatch(tryChange((playerName))),
  fold: () => dispatch(fold(playerName)),
  onSubmit: () => dispatch(tryBet(playerName)),
  onChange: (bet) => dispatch(typeBet(playerName, bet)),
  skipChange: () => dispatch(skipChange(playerName)),
  call: () => dispatch(call(playerName)),
  flipAboutToFold: () => dispatch(tryFold(playerName))
})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
