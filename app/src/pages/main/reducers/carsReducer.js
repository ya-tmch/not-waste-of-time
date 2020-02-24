import {
  CARS_FETCH_BEGIN,
  CARS_FETCH_END,
} from "../constants"

const initialState = {
  currentPage: 1,
  loading: true,
  total: 0,
  data: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CARS_FETCH_BEGIN:
      return {
        ...state,
        loading: true
      }

    case CARS_FETCH_END:
      return {
        ...state,
        loading: false,
        data: payload.data,
        total: payload.totalItems,
        currentPage: payload.currentPage,
      }

    default:
      return state
  }
}