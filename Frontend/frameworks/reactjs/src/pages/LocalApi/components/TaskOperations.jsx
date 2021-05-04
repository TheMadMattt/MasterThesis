import {TaskBtn} from "./TaskBtn";
import {Button} from "@material-ui/core";
import React from "react";

const TaskOperations = (props) => {
    return (
        <>
            <div className="flex-row operations">
                <TaskBtn cb={(task) => props.addTask(task)}/>
                <TaskBtn cb={(task) => props.updateTask(task)} isEditing taskId={props.taskId}/>
                <Button variant="contained" color="primary" className="ButtonMargin"
                        onClick={() => props.getSelectedTask()}>Get task</Button>
                <Button variant="contained" color="primary" className="ButtonMargin"
                        onClick={() => props.deleteTask()}>Delete task</Button>
                <Button variant="contained" color="primary"
                        onClick={() => props.getTasks()}>Get {props.taskCount} tasks</Button>
            </div>
        </>
    )
}

export default TaskOperations;
