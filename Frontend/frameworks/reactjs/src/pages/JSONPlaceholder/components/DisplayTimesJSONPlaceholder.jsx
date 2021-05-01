import {DisplayTime} from "../../../components/DisplayTime";
import React from "react";

const DisplayTimesJSONPlaceholder = (props) => {
    const displayTimeList = [
        {
            title: "Adding post",
            timer: props.addPostTimer
        },
        {
            title: 'Getting post',
            timer: props.getPostTimer
        },
        {
            title: "Updating post",
            timer: props.updateAllTimer
        },
        {
            title: "Removing " + props.rowsNumber + " rows",
            timer: props.removeAllTimer
        },
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

export default DisplayTimesJSONPlaceholder;
