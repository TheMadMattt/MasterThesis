import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useFormControls = (initialValue) => {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("title" in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."

        if ("body" in fieldValues) {
            temp.body = fieldValues.body ? "" : "This field is required."
        }

        setErrors({
            ...temp
        });
    }
    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    }
    const formIsValid = (fieldValues = values) => {
        validate();
        return fieldValues.title &&
            fieldValues.body &&
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

const PostForm = ({onDialogClose, isEditing, selectedPost}) => {
    const classes = useStyles();
    const initialFormValues = {
        id: isEditing? selectedPost.id : null,
        title: isEditing ? selectedPost.title : "",
        body: isEditing ? selectedPost.body : "",
        formSubmitted: false,
        success: false
    }

    const { handleInputValue, formValues, errors, formIsValid} = useFormControls(initialFormValues);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(formIsValid()) {
            const post = {
                id: isEditing ? formValues.id : 101,
                title: formValues.title,
                body: formValues.body
            }
            onDialogClose(post);
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
                <TextField name="body"
                           value={formValues.body}
                           variant="outlined"
                           multiline
                           onChange={handleInputValue}
                           onBlur={handleInputValue}
                           label="Body"
                           rows="5"
                           {...(errors["body"] && { error: true, helperText: errors["body"] })}/>
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

export const PostFormDialog = (props) => {
    const { onClose, open, isEditing, selectedPost } = props;

    const classes = useDialogStyles();

    return (
        <Dialog onClose={() => onClose(null)}
                open={open}>
            <DialogTitle>{isEditing ? 'Edit post' : 'Add post'}</DialogTitle>
            <div className={`flex-column flex-center ${classes.padding}`}>
                <PostForm onDialogClose={(post) => onClose(post)} isEditing={isEditing} selectedPost={selectedPost}/>
            </div>
        </Dialog>
    );
}
