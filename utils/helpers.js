import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'BL_NETEYE_CONFIG'

export function stateToString(state = 3) {
    return ['OK', 'Critical', 'Error', 'Unknown'][state]
}

export function formatService(service) {
    const {__name, display_name, host_name, state, last_check_result = {} } = service.attrs
    return {
        __name,
        display_name,
        host_name,
        state,
        status: stateToString(state),
        output: last_check_result.output,
        timestamp: last_check_result ? last_check_result.execution_end : 0

    }
}

export function formatTimeStamp(timestamp) {
    if (timestamp === 0) {
        return '-'
    }
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString()
}

export function loadServerSettings() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(settings => settings ? JSON.parse(settings) : undefined)
}

export function saveServerSettings(config) {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}