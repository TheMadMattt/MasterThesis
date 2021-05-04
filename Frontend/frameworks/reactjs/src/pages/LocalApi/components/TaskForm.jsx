import React, {useState} from "react";
import {Button, Checkbox, Dialog, DialogTitle, FormControlLabel, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useFormControls = (initialValue) => {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("title" in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."

        if ("description" in fieldValues) {
            temp.description = fieldValues.description ? "" : "This field is required."
        }

        setErrors({
            ...temp
        });
    }
    const handleInputValue = (e) => {
        const control = e.target;
        const { name } = control;
        let controlValue;
        if(control.type === "checkbox") {
            const { checked } = control;
            controlValue = checked;
        } else {
            const { value } = control;
            controlValue = value;
        }
        setValues({
            ...values,
            [name]: controlValue
        });
        validate({ [name]: controlValue });
    }
    const formIsValid = (fieldValues = values) => {
        validate();
        return fieldValues.title &&
            fieldValues.description &&
            Object.values(errors).every((x) => x === "");
    }
    return {
        handleInputValue,
        formValues: values,
        formIsValid,
        errors
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "300px",
        },
    },
}));

const TaskForm = ({onDialogClose, isEditing, selectedTask}) => {
    const classes = useStyles();
    const initialFormValues = {
        id: isEditing? selectedTask.id : null,
        title: isEditing ? selectedTask.title : "",
        description: isEditing ? selectedTask.description : "",
        completed: isEditing ? selectedTask.completed : false,
        formSubmitted: false,
        success: false
    }

    const { handleInputValue, formValues, errors, formIsValid} = useFormControls(initialFormValues);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(formIsValid()) {
            const task = {
                id: isEditing ? formValues.id : 101,
                title: formValues.title,
                description: formValues.description,
                completed: formValues.completed
            }
            onDialogClose(task);
        }
    }

    return (
        <div className="flex-column flex-center">
            <form onSubmit={handleFormSubmit} className={'flex-column ' + classes.root}>
                <TextField name="title"
                           value={formValues.title}
                           variant="outlined"
                           onChange={handleInputValue}
                           onBlur={handleInputValue}
                           label="Title"
                           {...(errors["title"] && { error: true, helperText: errors["title"] })}/>
                <TextField name="description"
                           value={formValues.description}
                           variant="outlined"
                           multiline
                           onChange={handleInputValue}
                           onBlur={handleInputValue}
                           label="Description"
                           rows="5"
                           {...(errors["description"] && { error: true, helperText: errors["description"] })}/>
                <FormControlLabel
                    control={
                        <Checkbox name="completed"
                                  checked={formValues.completed}
                                  onChange={handleInputValue}/>
                    }
                    label="Is completed?"
                />
                <Button variant="contained" type="submit" color="primary">Submit</Button>
            </form>
        </div>
    )
}

const useDialogStyles = makeStyles({
    padding: {
        padding: "0 15px 15px 15px"
    }
})

export const TaskFormDialog = (props) => {
    const { onClose, open, isEditing, selectedTask } = props;

    const classes = useDialogStyles();

    return (
        <Dialog onClose={() => onClose(null)}
                open={open}>
            <DialogTitle>{isEditing ? 'Edit post' : 'Add post'}</DialogTitle>
            <div className={`flex-column flex-center ${classes.padding}`}>
                <TaskForm onDialogClose={(task) => onClose(task)} isEditing={isEditing} selectedTask={selectedTask}/>
            </div>
        </Dialog>
    );
}
