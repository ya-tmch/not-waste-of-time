import {
  CARS_FETCH_FAIL,
  DEALERS_FETCH_FAIL,
} from "../constants"

const initialState = {
  error: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CARS_FETCH_FAIL:
      return {
        ...state,
        error: 'Cars fetching error: ' + payload
      }

    case DEALERS_FETCH_FAIL:
      return {
        ...state,
        error: 'Dealers fetching error: ' + payload
      }

    default:
      return state
  }
}