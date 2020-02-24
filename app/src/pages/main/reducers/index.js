import carsReducer from "./carsReducer"
import dealersReducer from "./dealersReducer"
import mainReducer from "./mainReducer"
import {combineReducers} from "redux"

export default combineReducers({
  main: mainReducer,
  cars: carsReducer,
  dealers: dealersReducer,
})