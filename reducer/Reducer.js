import combineReducers from 'redux'; 

export const ADD_AMOUNT_PLAYER = "ADD_AMOUNT_PLAYER"

const initialState={

  number:0
}


export default function countApp(state=initialState, action) {
  switch(action.type) {
    case ADD_AMOUNT_PLAYER:
      return Object.assign({}, state, {
        number: action.amount
      })
      default:
        return state
  }
}