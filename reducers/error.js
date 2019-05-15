import { ERROR } from "../actions/error";
import { IS_LOADING } from "../actions/loading";

export default function error(state = {}, action) {
    switch (action.type) {
        case ERROR:
            return { 
                isError: true,
                error: action.error
            }
        case IS_LOADING:
            return action.loading ? { isError: false } : state
        default:
            return state
    }
}