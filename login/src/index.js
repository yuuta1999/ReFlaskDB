/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,
  applyMiddleware,
  compose } from 'redux'
import thunk from 'redux-thunk'

import Root from './routes'
import userReducer from './reducers/index'

// Recommend when using Redux Devtools from Github
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  // handle async actions
  applyMiddleware(thunk)
  // other store enhancers if any
)

const store = createStore(
  userReducer,
  enhancer
)

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
)
