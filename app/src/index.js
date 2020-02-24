import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import Main from "./pages/main"
import store from "./store"

ReactDOM.render((
    <Provider store={store}>
      <Main/>
    </Provider>
  ),
  document.getElementById('root')
);