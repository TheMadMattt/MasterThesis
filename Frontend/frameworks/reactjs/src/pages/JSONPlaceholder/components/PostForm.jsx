import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const initialFormValues = {
    title: "",
    body: "",
    formSubmitted: false,
    success: false
}

const useFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("title" in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."

        if ("body" in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required."
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

const PostForm = ({onDialogClose}) => {
    const { handleInputValue, formValues} = useFormControls();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        onDialogClose(formValues);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField name="title"
                       onChange={handleInputValue}
                       label="Title" fullWidth/>
            <TextField name="body" onChange={handleInputValue} label="Body" fullWidth rows="5"/>
            <Button type="submit">Submit</Button>
        </form>
    )
}

const usePadding = makeStyles({
    padding: {
        padding: "0 15px 15px 15px"
    }
})

export const PostFormDialog = (props) => {
    const { onClose, open, isEditing } = props;

    const classes = usePadding();

    return (
        <Dialog onClose={() => onClose(null)} open={open}>
            <DialogTitle>{isEditing ? 'Edit post' : 'Add post'}</DialogTitle>
            <div className={`flex-column flex-center ${classes.padding}`}>
                <PostForm onDialogClose={(post) => onClose(post)} isEditing={isEditing}/>
            </div>
        </Dialog>
    );
}
