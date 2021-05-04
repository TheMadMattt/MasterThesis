import {DisplayTime} from "../../../components/DisplayTime";
import React from "react";

const DisplayTimesLocalApi = (props) => {
    const displayTimeList = [
        {
            title: "Adding task",
            timer: props.addTaskTimer
        },
        {
            title: "Updating task",
            timer: props.updateTaskTimer
        },
        {
            title: 'Getting task',
            timer: props.getTaskTimer
        },
        {
            title: "Removing task",
            timer: props.deleteTaskTimer
        },
        {
            title: "Getting tasks",
            timer: props.getTasksTimer
        },
        {
            title: "Rendering tasks",
            timer: props.renderTimer
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

export default DisplayTimesLocalApi;
