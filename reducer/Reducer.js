
import combineReducers from 'redux';
import { ADD_AMOUNT_PLAYER } from './Actions';
import { ADD_PLAYER_NAME } from './Actions';
import { ADD_POINTS } from './Actions';
import { SUB_POINTS } from './Actions';
import { SET_POINTS } from './Actions';
import { SET_PLACE } from './Actions';

//export const ADD_AMOUNT_PLAYER = "ADD_AMOUNT_PLAYER"
const initialState = {

  number: 0,
  player: { 1: 
    { 
      playerName: '', 
      playerNumber: 0, 
      points: 0, 
      numberOfBest: 0,
      pointRecord: [], 
    } },
  playerIDs: []
}

function playerAmount(state, action) {
  switch (action.type) {
    case ADD_AMOUNT_PLAYER:
      return Object.assign({}, state, {
        number: action.amount
      })
    default:
      return state
  }

}

function playerOperations(state, action) {
  switch (action.type) {
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
              numberOfBest: 0,
              pointRecord: [],
            }
        },
        playerIDs: state.playerIDs.includes(action.playerNumber) ? state.playerIDs : state.playerIDs.concat(action.playerNumber)
      }
    case SET_PLACE:
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
            {
              ...state.player[action.id],
              numberOfBest: action.numberOfBest,
            },
        }
      }
    default:
      return state
  }
}

function pointOperations(state, action) {
  switch (action.type) {
    case ADD_POINTS:
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
            {
              ...state.player[action.id],
              points: parseInt(state.player[action.id].points, 10) + parseInt(action.points, 10),
              pointRecord: [...state.player[action.id].pointRecord, "+" + action.points],
            },
        }
      }
    case SUB_POINTS:
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
            {
              ...state.player[action.id],
              points: parseInt(state.player[action.id].points, 10) - parseInt(action.points, 10),
              pointRecord:  [...state.player[action.id].pointRecord, "-" + action.points],
            },
        }
      }
    case SET_POINTS:
      return {
        ...state,
        player: {

          ...state.player,
          [action.id]:
            {
              ...state.player[action.id],
              points: action.points,
            },
        }
      }
      
    default:
      return state

  }

}

export default function countApp(state = initialState, action) {
  switch (action.type) {
    case ADD_AMOUNT_PLAYER:
      return (
        playerAmount(state, action)
      )
    case ADD_PLAYER_NAME:
      return (playerOperations(state, action))
    case ADD_POINTS: {
      return (pointOperations(state, action))
    }
    case SUB_POINTS: {
      return (pointOperations(state, action))
    }
    case SET_POINTS: {
      return(pointOperations(state, action))
    }
    case SET_PLACE: {
      return (playerOperations(state, action))
    }
    default:
      return state
  }
}
/*
export default function countMainReducer(state = initialState, action) {
  return {
    playerAmount: playerAmount(
      state.number,
      action
    ),
    playerOperations: playerOperations(
      state.player,
      action
    ),
    pointOperations: pointOperations(
      state.player,
      action
    )

  }
}
*/

/*
const countMainReducer = combineReducers({
  playerAmount: playerAmount,
  playerOperations: playerOperations,
  pointOperations: pointOperations
})
*/