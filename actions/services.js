import {
    loadServices,
} from '../utils/api'

import { loading } from './loading'
import { error } from './error';

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'


function receiveServices(services) {
    return {
        type: RECEIVE_SERVICES,
        services
    }
}


export function handleLoadServices(settings) {    
    return dispatch => {
        dispatch(loading(true))
        return loadServices(settings)
            .then( ({ results }) => {
                dispatch(receiveServices(results))
                dispatch(loading(false))
            })
            .catch(e => {
                dispatch(loading(false))
                dispatch(error(e))
            })

    }
}
