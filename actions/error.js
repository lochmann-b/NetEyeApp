export const ERROR = 'ERROR'

export function error(error) {
    return {
        type: ERROR,
        error
    }
}