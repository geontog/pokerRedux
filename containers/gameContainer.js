import { connect } from 'react-redux';
import { newRound, resetState } from '../models/poker';
import { Game } from '../components';

const mapStateToProps = ({ gameInfo }) => {
  return {
    moneyPool: gameInfo.moneyPool,
    winner: gameInfo.winner,
    status: gameInfo.status,
    roundSection: gameInfo.roundSection,
    playerTurn: gameInfo.playerTurn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRound: () => dispatch(newRound()),
    resetState: () => dispatch(resetState())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
