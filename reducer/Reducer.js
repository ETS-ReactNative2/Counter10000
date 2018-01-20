import combineReducers from 'redux'; 

export const ADD_AMOUNT_PLAYER = "ADD_AMOUNT_PLAYER"

const initialState = {
  number:0
}

function count(state = initialState, action) {
  switch(action.type) {
    case ADD_AMOUNT_PLAYER:
      return Object.assign({}, state, {
        number: action.number
      })
      defaut:
        return state
  }

}

export default function countApp(state = {}, action) {
  return {
    number: count(state.number, action)
  }
}