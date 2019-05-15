import { RECEIVE_SETTINGS } from '../actions/settings'

export default function settings(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SETTINGS:        
            return {...action.settings}
        default:
            return state
    }

}