
export type State = {
    counter: number
}
export type IncrementAction = {
    type: 'increment'
}
export type DecrementAction = {
    type: 'decrement'
}
export type Action = DecrementAction | IncrementAction;

const initialState: State = {
    counter: 0
}

export const  CountReducer = (state = initialState, action: Action ): State => {
    switch (action.type){
        case "increment":
            return {
                ...state,
                counter: state.counter + 1,
            }
        case 'decrement':
            return {
                ...state,
                counter: state.counter - 1,
            }
        default:
            return state
    }
}