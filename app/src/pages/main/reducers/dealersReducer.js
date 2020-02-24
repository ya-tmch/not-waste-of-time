import {DEALERS_FETCH_BEGIN, DEALERS_FETCH_END} from "../constants"

const initialState = {
  loading: false,
  data: [],
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case DEALERS_FETCH_BEGIN:
      return {
        ...state,
        loading: true,
      }

    case DEALERS_FETCH_END:
      return {
        loading: false,
        data: [...state.data, ...payload]
      }

    default:
      return state
  }
}