import {
    loadServerSettings, saveServerSettings,
} from '../utils/helpers'

import { error } from './error';
import { loading } from './loading';

export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'


function receiveSettings(settings) {
    return {
        type: RECEIVE_SETTINGS,
        settings
    }
}


export function handleLoadSettings() {
    return dispatch => {
        dispatch(loading(true))
        return loadServerSettings()
            .then(settings => {
                dispatch(loading(false))
                dispatch(receiveSettings(settings))
            })
            .catch(e => {
                dispatch(loading(false))
                dispatch(error(e))
            })
    }
}

export function handleSaveSettings(settings) {
    return dispatch => {
        return saveServerSettings()
        .then(dispatch(receiveSettings(settings)))
        .catch(e => {
            dispatch(error(e))
        })
    }
}
