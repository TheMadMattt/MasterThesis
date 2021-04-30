import React from "react";

export const DisplayLoadingTimes = ({title, times}) => {
    return (
        <div>
            <p><b>{ title }</b></p>
            <ul className="loading-metrics-box">
                {times.map((time, index) => <li key={index}>{time} ms</li>)}
            </ul>
        </div>
    );
}
