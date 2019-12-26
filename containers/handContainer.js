import { connect } from 'react-redux';
import { selectCard } from '../models/poker';
import { Hand } from '../components';

const mapStateToProps = (state, { playerName }) => {
  const { cards, selections } = state[playerName];
  return {
    cards: cards.cards.orderedCards,
    selections,
    roundSection: state.gameInfo.roundSection,
    playerName
  }
}

const mapDispatchToProps = (dispatch, { playerName }) => ({
  cardClick: clickedCard => dispatch(
    selectCard(playerName, clickedCard)
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hand)
