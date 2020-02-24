import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from 'redux-thunk'
import mainReduces from "./pages/main/reducers"

const reducer = combineReducers({
  main: mainReduces
})

export default createStore(reducer, applyMiddleware(thunk))