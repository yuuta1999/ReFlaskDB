import { createBrowserHistory } from 'history'

// global history for redux
export const history = createBrowserHistory()

export const parseJSON = (response) => response.data

export const createReducer = (initialState, reducerMap) => {
  return (state = initialState, action) => {
    // this should be a method
    const reducer = reducerMap[action.type]

    return reducer
      ? reducer(state, action.payload)
      : state
  }
}
