import {createStore} from 'redux'
import {app} from './reducer'

export const store = createStore(app);