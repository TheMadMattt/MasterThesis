import React from "react";
import {FormatNumber} from "../../../utils/FormatNumber";

const decimalPlaces = 5;

export const DisplayLoadingTimes = ({title, times}) => {
    return (
        <div>
            <p><b>{ title }</b></p>
            <ul className="loading-metrics-box">
                {times.map((time, index) => <li key={index}>{FormatNumber(time, decimalPlaces)} ms</li>)}
            </ul>
        </div>
    );
}
