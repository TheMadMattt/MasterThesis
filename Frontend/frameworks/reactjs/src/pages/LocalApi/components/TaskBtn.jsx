import React, {useState} from "react";
import {Button} from "@material-ui/core";
import apiService from '../../../api/local-api.service';
import {TaskFormDialog} from "./TaskForm";

export const TaskBtn = ({cb, isEditing = false, taskId}) => {
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = (task) => {
        setOpen(false);
        if (task) {
            cb(task);
        }
    }

    const getTask = () => {
        apiService.getTask(taskId).then(task => {
            setSelectedTask(task.data);
            setOpen(true);
        });
    }

    const props = { onClose: handleDialogClose, open, isEditing, selectedTask}

    return (
        <>
            <Button variant="contained"
                    color="primary"
                    className="ButtonMargin"
                    onClick={isEditing ? getTask : handleDialogOpen}>
                {isEditing ? 'Edit task' : 'Add task'}
            </Button>
            <TaskFormDialog {...props} />
        </>
    )
}
