import {TaskBtn} from "./TaskBtn";
import {Button, TextField} from "@material-ui/core";
import React, {useState} from "react";

const TaskOperations = (props) => {
    const [taskId, setTaskId] = useState(1);

    const handleInputValue = (e) => {
        setTaskId(e.target.value);
    }

    return (
        <div className="operations">
            <div className="flex-row">
                <TextField
                    name="taskId"
                    label="Enter taskId"
                    variant="outlined"
                    value={taskId}
                    onChange={handleInputValue}
                    style={{marginBottom: "15px"}}
                    error={props.getTaskError.error}
                    helperText={props.getTaskError.error ? props.getTaskError.message : ""}
                />
            </div>
            <div className="flex-row">
                <TaskBtn cb={(task) => props.addTask(task)}/>
                <TaskBtn cb={(task) => props.updateTask(task)} isEditing taskId={taskId}/>
                <Button variant="contained" color="primary" className="ButtonMargin"
                        onClick={() => props.getSelectedTask(taskId)}>Get task</Button>
                <Button variant="contained" color="primary" className="ButtonMargin"
                        onClick={() => props.deleteTask(taskId)}>Delete task</Button>
                <Button variant="contained" color="primary"
                        onClick={() => props.getTasks()}>Get {props.taskCount} tasks</Button>
            </div>
        </div>
    )
}

export default TaskOperations;
