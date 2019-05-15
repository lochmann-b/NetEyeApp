import { reset } from '../utils/api'

export const RESET_ALL = "RESET_ALL"

function resetAll() {
    return {
        type: RESET_ALL
    }
}

export function handleResetAll() {
    return dispatch => {
        return reset()
        .then( () => {
            dispatch(resetAll())
        })
    }
}