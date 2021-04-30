import {DisplayTime} from "../../../components/DisplayTime";
import React from "react";

const DisplayTimeList = (props) => {
    const displayTimeList = [
        {
            title: "Creating " + props.rowsNumber + " rows",
            timer: props.createTimer
        },
        {
            title: "Update " + props.rowsNumber + " rows",
            timer: props.updateAllTimer
        },
        {
            title: "Appending 1000 rows",
            timer: props.appendTimer
        },
        {
            title: "Removing " + props.rowsNumber + " rows",
            timer: props.deleteAllTimer
        },
        {
            title: "Selecting random row",
            timer: props.selectRandomTimer
        },
        {
            title: "Updating random row",
            timer: props.updateRandomTimer
        },
        {
            title: "Removing random row",
            timer: props.removeRandomTimer
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
