
export const IS_LOADING = 'LOADING'

export function loading(loading){
    return {
        type: IS_LOADING,
        loading
    }
}