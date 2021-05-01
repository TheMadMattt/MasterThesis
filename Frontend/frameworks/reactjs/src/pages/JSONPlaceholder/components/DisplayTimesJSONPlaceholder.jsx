import {DisplayTime} from "../../../components/DisplayTime";
import React from "react";

const DisplayTimesJSONPlaceholder = (props) => {
    const displayTimeList = [
        {
            title: "Adding post",
            timer: props.addPostTimer
        },
        {
            title: "Updating post",
            timer: props.updatePostTimer
        },
        {
            title: 'Getting post',
            timer: props.getPostTimer
        },
        {
            title: "Removing post",
            timer: props.deletePostTimer
        },
        {
            title: "Getting posts with comments",
            timer: props.getPostsWithCommentsTimer
        },
        {
            title: "Rendering 100 posts",
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

export default DisplayTimesJSONPlaceholder;
