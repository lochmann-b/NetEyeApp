import { combineReducers } from 'redux'
import services from './services'
import loading from './loading'
import settings from './settings'
import error from './error'

export default combineReducers({
    loading,
    services,
    settings,
    error
})