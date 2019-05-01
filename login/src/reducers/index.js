import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

import user from './user'

/**
 * Notes when use rootReducer:
 * Because it has multiple reducers
 * in one project, you have to 
 * use right syntax to access.
 */

const rootReducer = combineReducers({
  user,
  form: formReducer
})

export default rootReducer
