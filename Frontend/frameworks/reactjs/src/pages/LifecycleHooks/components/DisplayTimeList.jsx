import {DisplayTime} from "../../../components/DisplayTime";
import React from "react";

const DisplayTimeList = (props) => {
    const displayTimeList = [
        {
            title: "Creating " + props.rowsNumber + " rows",
            timer: props.createTimer
        },
        {
            title: "Appending " + props.rowsNumber + " rows",
            timer: props.appendTimer
        },
        {
            title: "Removing all rows",
            timer: props.deleteAllRowsTimer
        }
    ];

    return (
        <>
            {
                displayTimeList.map((displayTime, index) =>
                    <DisplayTime key={index} {...displayTime}/>
                )
            }
        </>
    )
}

export default DisplayTimeList;
