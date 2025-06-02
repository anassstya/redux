import { configureStore } from '@reduxjs/toolkit'
import {CountReducer} from "./Counter/CountReducer.tsx";

export const store = configureStore({
    reducer: {
        counter: CountReducer
    },
})
export type RootState = ReturnType<typeof store.getState>;
