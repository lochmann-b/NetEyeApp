import { RECEIVE_SERVICES } from '../actions/services'
import { formatService } from '../utils/helpers';

export default function services(state = [], action) {
    switch (action.type) {
        case RECEIVE_SERVICES:
            return action.services.map(service => formatService(service))
        default:
            return state
    }

}