import React from "react";
import {Link} from "react-router-dom";
import './MainPage.css'

export default function MainPage(){
    return(
        <div className={'mainContainer'}>
            <h1 className={'mainText'}>REDUX</h1>
            <div className={'mainButtons'}>
                <Link to={'counter'} className={'btnItem'}>Счетчик вычислений</Link>
            </div>
        </div>
    )
}