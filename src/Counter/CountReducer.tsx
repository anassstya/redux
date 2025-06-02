import Counter from "./Counter.tsx";

type Item = {
    id: number,
    amount: number
    name: string
}

type State = {
    items: Item[];
    editedId: number | null;
    filter: string;
}

const initialState: State = {
    items: [],
    editedId: null,
    filter: "",

};

export type Action =
    | { type: 'ADD_ITEM'; payload: { amount: number; name: string } }
    | { type: 'CANCEL_ITEM' }
    | { type: 'DELETE_ITEM'; payload: { id: number } }
    | { type: 'CHANGE_ITEM'; payload: { id: number; amount: number; name: string } }
    | { type: 'START_EDIT'; payload: { id: number } }
    | { type: 'SET_FILTER'; payload: { filter: string } };

export const CountReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: Date.now(),
                        amount: action.payload.amount,
                        name: action.payload.name
                    }
                ]
            };

        case "CANCEL_ITEM":
            return {
                ...state,
                editedId: null,
            };

        case "CHANGE_ITEM":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, amount: action.payload.amount, name: action.payload.name }
                        : item
                ),
                editedId: null,
            };

        case "DELETE_ITEM":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                editedId:
                    state.editedId !== null && state.editedId === action.payload.id
                        ? null
                        : state.editedId,
            };

        case "START_EDIT":
            return {
                ...state,
                editedId: action.payload.id,
            };

        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload.filter,
            };

        default:
            return state;
    }
};
