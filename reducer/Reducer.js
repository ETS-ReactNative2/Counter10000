import combineReducers from 'redux';

export const ADD_AMOUNT_PLAYER = "ADD_AMOUNT_PLAYER"
export const ADD_PLAYER_NAME = "ADD_PLAYER_NAME"
export const ADD_POINTS = "ADD_POINTS"
export const SUB_POINTS = "SUB_POINTS"
export const SET_POINTS = "SET_POINTS"

const initialState = {

  number: 0,
  player: { 1: { playerName: 'Sandro', playerNumber: 1, points: 0 } },
  playerIDs: []
}
// Get player players.1.playername ...

export default function countApp(state = initialState, action) {
  switch (action.type) {
    case ADD_AMOUNT_PLAYER:
      return Object.assign({}, state, {
        number: action.amount
      })
    case ADD_PLAYER_NAME:
      return {
        ...state,
        player: {

          ...state.player,
          [action.playerNumber]:
            {
              playerName: action.playerName,
              playerNumber: action.playerNumber,
              points: 0,
            }
        },
        playerIDs: state.playerIDs.includes(action.playerNumber) ? state.playerIDs : state.playerIDs.concat(action.playerNumber)
      }
    case ADD_POINTS: {
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
          {
            ...state.player[action.id],
            points: parseInt(state.player[action.id].points,10) + parseInt(action.points,10),
          },
        }
      }
    }
    case SUB_POINTS: {
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
          {
            ...state.player[action.id],
            points: parseInt(state.player[action.id].points,10) - parseInt(action.points,10),
          },
        }
      }
    }
    case SET_POINTS: {
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
          {
            ...state.player[action.id],
            points: parseInt(action.points,10),
          },
        }
      }
    }
    default:
      return state
  }
}