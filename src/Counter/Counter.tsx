import './Counter.css'
import {store} from "../store.ts";
import type {DecrementAction, IncrementAction} from "./CountReducer.tsx";
import {useEffect, useReducer} from "react";

export default function Counter(){
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
       const unsubscribe = store.subscribe(() => {
           forceUpdate();
       })

        return unsubscribe
    }, [])


    return(
        <div className={'mainContainer'}>
            <p className={'mainAnswer'}>{store.getState().counter.counter}</p>
            <div className={'mainButtons'}>
                <button onClick={() => store.dispatch({type: 'increment'} satisfies IncrementAction)}
                    className={'btnItem'}> + </button>
                <button onClick={() => store.dispatch({type: 'decrement'} satisfies DecrementAction)}
                    className={'btnItem'}> - </button>
            </div>

        </div>
    )
}